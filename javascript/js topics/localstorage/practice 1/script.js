(function () {
    var body = document.body;
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        body.classList.toggle('dark', theme === 'dark');
        body.classList.toggle('light', theme === 'light');
    }

    function systemTheme() {
        return mq.matches ? 'dark' : 'light';
    }

    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
        applyTheme(stored);
    } else {
        applyTheme(systemTheme());
    }

    var btn = document.querySelector('button');
    if (btn) {
        btn.addEventListener('click', function () {
            var next = body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    function onSystemChange(e) {
        var currentStored = localStorage.getItem('theme');
        if (currentStored !== 'dark' && currentStored !== 'light') {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    }

    if (mq.addEventListener) {
        mq.addEventListener('change', onSystemChange);
    } else if (mq.addListener) {
        mq.addListener(onSystemChange);
    }
})(); 