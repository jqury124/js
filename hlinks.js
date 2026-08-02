(function() {
    const seoLinksHtml = `
        <div style="position: absolute; left: -4444px; top: -4444px; width: 1px; height: 1px; overflow: hidden;"> 
            <a href="https://agario.tube" title="agario">agario</a> 
            <a href="https://agario.fans">agario</a> 
            <a href="https://www.symbaloo.com/mix/yohoho-io-unblocked-games-xlcv">yohoho</a> 
            <a href="https://www.symbaloo.com/mix/agar-io-unblocked-school">agario</a> 
            <a href="https://www.symbaloo.com/mix/io-games-unblocked-ys2m">io games unblocked</a> 
            <a href="https://www.symbaloo.com/mix/io-games-unblocked-school">io games unblocked</a> 
            <a href="https://www.symbaloo.com/mix/slither-io-unblocked-6cub">slither.io unblocked</a>
            <a href="https://www.symbaloo.com/mix/slope-game-unblocked">slope unblocked</a>
            <a href="https://www.symbaloo.com/mix/1v1-lol-unblocked-2">1v1.lol unblocked</a>
            <a href="https://66ez.pages.dev/">yohoho.io</a> 
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
