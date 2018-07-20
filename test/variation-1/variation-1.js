var utils = window["optimizely"].get('utils');
var defaultRebrandURL = 'https://s3-us-west-1.amazonaws.com/zach-designs/rebrand/v2rb.css';
jQuery(document).on('change','#rebrand-switch', function(event) {
    
    if(event.target.checked){
        applyNewCSSWithURL(localStorage.getItem('optly_rebrand_url')|| defaultRebrandURL);
        localStorage.setItem('optly_rebrand', 'true'); 
    } else {
        applyDefaultCSS();
        localStorage.setItem('optly_rebrand', 'false'); 
    }

    console.log(localStorage.getItem('optly_rebrand'));
});

utils.waitForElement('#rebrand-switch').then(function(rebrandSwitch) {
    if(localStorage.getItem('optly_rebrand')){
        rebrandSwitch.checked = eval(localStorage.getItem('optly_rebrand'));
    }
});

utils.waitForElement('#rebrand-url').then(function(rebrandUrlInput) {
    jQuery(rebrandUrlInput).val(localStorage.getItem('optly_rebrand_url')|| defaultRebrandURL);
    jQuery(rebrandUrlInput).on('change keydown keyup', function(event) {
        url = jQuery(event.target).val();
        applyNewCSSWithURL(url);	
        localStorage.setItem('optly_rebrand_url',url);        
    });
});

function applyDefaultCSS(url){
    // Remove any old stuff
    jQuery('link[title="rebrand"]').remove();

    // Enable default
    document.styleSheets[0].disabled = false;
}

function applyNewCSSWithURL(url){
    // Remove any old stuff
    jQuery('link[title="rebrand"]').remove();

    // Create new link element
  	var CSSElement = document.createElement('link');                
    CSSElement.setAttribute('title', 'rebrand');
    CSSElement.setAttribute('rel', 'stylesheet');
    CSSElement.setAttribute('type', 'text/css');
    CSSElement.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(CSSElement);
  
    // Disable default CSS
    document.styleSheets[0].disabled = true;
}

// Kick things off
if(eval(localStorage.getItem('optly_rebrand'))){
    console.log(localStorage.getItem('optly_rebrand'));
    applyNewCSSWithURL(localStorage.getItem('optly_rebrand_url')|| defaultRebrandURL)
}
