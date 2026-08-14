import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

type Toast = {
    id: number;
    title: string;
    description?: string;
    variant: ToastVariant;
};

type ToastInput = {
    title: string;
    description?: string;
    variant?: ToastVariant;
    /** ms before auto-dismiss; pass 0 to require a manual dismiss. */
    duration?: number;
};

const ToastContext = createContext<((toast: ToastInput) => void) | null>(null);

const DEFAULT_DURATION = 6000;

const VARIANT_STYLES: Record<ToastVariant, { ring: string; icon: typeof Info; iconColor: string }> = {
    success: {
        ring: "border-success/40",
        icon: CheckCircle2,
        iconColor: "text-success",
    },
    error: {
        ring: "border-danger/40",
        icon: AlertCircle,
        iconColor: "text-danger",
    },
    info: {
        ring: "border-sky-500/40",
        icon: Info,
        iconColor: "text-primary",
    },
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const nextId = useRef(1);
    const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

    const dismiss = useCallback((id: number) => {
        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const toast = useCallback(
        ({ title, description, variant = "info", duration = DEFAULT_DURATION }: ToastInput) => {
            const id = nextId.current++;
            setToasts((current) => [...current, { id, title, description, variant }]);
            if (duration > 0) {
                timers.current.set(
                    id,
                    setTimeout(() => dismiss(id), duration),
                );
            }
        },
        [dismiss],
    );

    // Clear pending timers if the provider unmounts mid-countdown.
    useEffect(() => {
        const pending = timers.current;
        return () => {
            pending.forEach((timer) => clearTimeout(timer));
            pending.clear();
        };
    }, []);

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div
                aria-live="polite"
                aria-atomic="false"
                className="pointer-events-none fixed bottom-4 right-4 z-[1100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3"
            >
                {toasts.map((item) => {
                    const { ring, icon: Icon, iconColor } = VARIANT_STYLES[item.variant];
                    return (
                        <div
                            key={item.id}
                            role={item.variant === "error" ? "alert" : "status"}
                            className={cn(
                                "pointer-events-auto flex items-start gap-3 rounded-lg border bg-popover p-4 shadow-lg motion-safe:animate-toast-in",
                                ring,
                            )}
                        >
                            <Icon
                                className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)}
                                aria-hidden="true"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">
                                    {item.title}
                                </p>
                                {item.description && (
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed break-words">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => dismiss(item.id)}
                                aria-label={`Dismiss: ${item.title}`}
                                className="shrink-0 cursor-pointer rounded-md p-1 text-subtle transition-colors duration-200
                                hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

/**
 * Push a toast. Throws if used outside <ToastProvider>.
 *
 * `toast` is referentially stable (useCallback in the provider), so it is safe
 * to list in a dependency array.
 */
export function useToast() {
    const toast = useContext(ToastContext);
    if (!toast) {
        throw new Error("useToast must be used within a <ToastProvider>");
    }
    return { toast };
}
