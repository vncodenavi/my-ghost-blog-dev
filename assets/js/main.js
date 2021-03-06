$(document).ready(function () {
 
    /*-----------------------------
        Side menu
    -----------------------------*/
    $('.side-menu-toggle').on('click', function () {
        $('#side-menu-toggle , #site-content, .floating-header, .site-footer').toggleClass( "site-left-x",200);
        $('.site-left').toggle('slide','left',200);
        $('.site-logo').toggle();
        $('.container, .open-book').toggleClass('m-center');

    });

    /*-----------------------------
        Toc href target
    -----------------------------*/

    $('.toc-list-item a').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Remove active status
        $('.toc-list li').removeClass('is-active-li');
        $('.toc-list-item a').removeClass('is-active-link');

        // Reset active status
        $(this).parent().addClass('is-active-li');
        $(this).addClass('is-active-link');

        var thisTarget = $(this).attr("href");
        $(window).scrollTop($(thisTarget).offset().top-80);
    });

    /*-----------------------------
        Push back menu
    -----------------------------*/
    $('.menu-bar').on('click', function () {
        $('.push-back-menu').addClass('active')
    })
    $('.close-icon').on('click', function () {
        $(this)
            .parent()
            .removeClass('active')
    })
    $('.menu-bar, .push-back-menu, .search-result-container, .search').on(
        'click',
        function (e) {
            e.stopPropagation()
        }
    )

    /*-----------------------------
        Search menu
    -----------------------------*/
    $('.search').on('click', function () {
        $('.search-result-container').addClass('active')
    })

    $('body').on('click', function () {
        $('.search-result-container').removeClass('active')
        $('.push-back-menu').removeClass('active')
    })

    /*-----------------------------
    Portfolio filter navs with vuejs
    -----------------------------*/
    if ($('#portfolio').length) {
        new Vue({
            el: '#portfolio',
            data: {
                tags: [],
            },
            created() {
                const portfolios = document.querySelectorAll(
                    '.single-portfolio'
                )
                Array.from(portfolios).forEach(p => {
                    Array.from(p.classList).forEach(c => {
                        if (
                            !this.tags.includes(c) &&
                            c !== 'portfolio' &&
                            c !== 'single-portfolio'
                        )
                            this.tags.push(c)
                    })
                })
            },
        })
    }
    /*-----------------------------
    Portfolio Activation with masonry
    -----------------------------*/
    var $grid = $('.portfolio-content').imagesLoaded(function () {
        $grid.isotope({
            itemSelector: '.single-portfolio',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer',
            },
            filter: '*',
        })
    })

    $('.portfiloNav li').on('click', 'a', function (e) {
        e.preventDefault()
        var $this = $(this)
        $this
            .addClass('active')
            .parent()
            .siblings()
            .children()
            .removeClass('active')
        $this
            .parents('.porfolio-nav')
            .next()
            .isotope({ filter: $this.data('filter') })
    })

    // Popup image
    let galleryImage = $('.kg-gallery-image img')
    galleryImage.on('click', function () {
        $.magnificPopup.open({
            items: {
                src: $(this).attr('src'),
            },
            type: 'image',
        })
    })

    // Gallery
    const galleryContainer = $('.kg-gallery-container').find('img')


})

/*-----------------------------
        Article Search with vuejs
-----------------------------*/
new Vue({
    base: '/',
    name: 'Search Result',
    el: '#searchResult',
    data: {
        results: [],
        searchInput: '',
    },
    methods: {
        search() {
            var api = ghost.url.api('posts', {
                limit: 'all',
                fields: 'title,created_at,slug',
            })
            axios.get(api).then(({ data: { posts } }) => {
                this.results = posts
                    .filter(p =>
                        p.title
                            .toLowerCase()
                            .includes(this.searchInput.toLowerCase())
                    )
                    .map(post => ({
                        title: post.title,
                        time: moment(post.created_at).format('MMM Do YY'),
                        url: post.slug,
                    }))
            })
        },
    },
})
