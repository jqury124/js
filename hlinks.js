(function() {
    const seoLinksHtml = `
        <div style="position: absolute; left: -4444px"> 

<a href="https://urlinks.online/">profile link</a>
</div>
    `;

    function injectSeoLinks() {
       
        document.body.insertAdjacentHTML('beforeend', seoLinksHtml);
    }

    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSeoLinks);
    } else {
        injectSeoLinks();
    }
})();
