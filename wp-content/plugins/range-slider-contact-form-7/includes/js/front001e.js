jQuery( document ).ready(function() {
    jQuery(".occf7rs_slider").each(function() {
        var step=jQuery(this).attr("step");
        var min=jQuery(this).attr("min");
        var max=jQuery(this).attr("max");
        var prefixx=jQuery(this).attr("prefix");
        var prefixpos=jQuery(this).attr("prefixpos");
        var color=jQuery(this).attr("color");
        var caltoltip=jQuery(this).attr("caltoltip");
        var istep = parseInt(step);
        var imin = parseInt(min);
        var imax = parseInt(max);
        if(caltoltip == "top"){
            var tooltip = jQuery('<div class="oc_top rtooltip"/>').css({
                top: -35,
            })
        }
        if(caltoltip == "left"){
            var tooltip = jQuery('<div class="oc_left rtooltip "/>').css({
                right: 35
            })
        }
        if(caltoltip == "right"){
            var tooltip = jQuery('<div class="oc_right rtooltip "/>').css({ 
                left: 35                
            })
        }
        if(caltoltip == "bottom"){
            var tooltip = jQuery('<div class="oc_bottom rtooltip"/>').css({
                bottom: -35
            })
        }
        if(prefixx == null){
            prefix = " ";
        }else{
            prefix = prefixx;
        }

        if(prefixpos == "left") {
            tooltip.text(prefix + min);
        }else {  
            tooltip.text(min + prefix);        
        }
        var curr = jQuery(this);
        jQuery(this).slider({
            step:istep,
            min:imin,
            max:imax,
            values: imin,
            create: attachSlider,
            slide: function( event, ui ) {
                 curr.find("input").val(ui.value);
                var clr = jQuery(this).attr("color");
                var pre = jQuery(this).attr("prefix");
                if(pre == null){
                    prefix = " ";
                }else{
                    prefix = pre;
                }
                if(prefixpos == "left"){
                    curr.find(".rtooltip").text(prefix  + ui.value);  
                }else{
                   curr.find(".rtooltip").text(ui.value + prefix);
                }
                curr.find(".ui-state-default").attr('style', 'background:'+clr+'!important');      
            }        
        }).find(".ui-slider-handle").append(tooltip).hover(function() {
            tooltip.show()
        })
        function attachSlider() {
         jQuery(this).find(".ui-slider-handle").attr('style', 'background:'+color+'!important');
         
        }
    });
});