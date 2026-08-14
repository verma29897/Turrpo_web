# Contact form delivery

The site is a static front end with no backend of its own. The contact form
(`src/pages/Contact.tsx` → `src/services/contact.ts`) therefore has two modes.

## Current behaviour (no endpoint configured)

Submitting a valid form opens the visitor's mail client with the message
pre-filled and addressed to the address in `src/constants/site.ts`. The UI says
exactly that. It does **not** claim the message was sent.

> Before this change the form waited one second and then displayed
> "Message sent successfully!" while only writing the values to `console.log`.
> Nothing was ever delivered.

## Enabling real submission

Set one environment variable at build time:

```bash
# .env.local (or the Vercel project's environment variables)
VITE_CONTACT_ENDPOINT=https://your-api.example.com/contact
```

With that set, the form POSTs instead of opening a mail client, and shows a
real success toast only after a 2xx response.

### Endpoint contract

```
POST <VITE_CONTACT_ENDPOINT>
Content-Type: application/json
Accept: application/json
```

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+91 90000 00000",
  "message": "We need help with SOC coverage for a 400-endpoint estate."
}
```

Responses:

| Status  | UI result                                                              |
| ------- | ---------------------------------------------------------------------- |
| `2xx`   | Success toast, form cleared                                             |
| non-2xx | Error toast + inline error naming the status code, form values retained |
| network failure | Error toast + inline error, form values retained                |

Any service accepting that shape works: a Formspree/Basin form endpoint, a
Vercel serverless function, or an internal API. No client changes are needed;
the front end only checks the HTTP status.

### Suggested server-side additions

These are **not** implemented client-side and should be handled by whatever
receives the POST:

- Spam protection (rate limiting, captcha, or a honeypot field)
- Server-side re-validation of every field
- Storage or forwarding to the sales inbox
