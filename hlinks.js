(function() {
    const seoLinksHtml = `
        <div style="position: absolute; left: -4444px"> 
<a href="https://agar.live" title="agario">agario</a> 
<a href="https://agarlive.site">agario</a> 
<a href="https://www.symbaloo.com/mix/yohoho-io-unblocked-games-xlcv">yohoho</a> 
<a href="https://www.symbaloo.com/mix/agar-io-unblocked-school">agario</a> 
<a href="https://www.symbaloo.com/mix/io-games-unblocked-ys2m">io games</a> 
<a href="https://www.symbaloo.com/mix/slope-game-unblocked">slope</a>
<a href="https://yo-ho-ho.site/">yohoho</a>
<a href="https://retrobowl26.space/">retro bowl</a>
<a href="https://rcnut.com/unblocked-games/">unblocked games</a>
<a href="https://unblockedgames76.pages.dev/">unblocked games 76</a>
<a href="https://unblockedgames76.college/">unblocked games college</a>
<a href="https://unblockedgames76.space/">unblocked games space</a>
<a href="https://newunblockedgames.live/">new unblocked games</a>
<a href="https://lessons.guru/">lesson 1</a>
<a href="https://agar-game.github.io/">agario game</a>
<a href="https://ubghub.guru/">UBGHub</a>
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
