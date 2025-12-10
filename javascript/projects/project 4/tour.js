/* Lightweight guided tour for the UI
   Usage: call startTour() or press the 'Take a Tour' button.
   This script creates an overlay, a tooltip and positions a highlight rectangle over target elements.
*/
(function(){
    const steps = [
        { el: 'guessfield', title: 'Enter a guess', text: 'Type a number between 1 and 100 into this field. The game validates your input.' },
        { el: 'subt', title: 'Submit your guess', text: 'Click this button to submit your guess. You have 10 attempts.' },
        { el: '.guesses', title: 'Previous guesses', text: 'All your previous guesses are shown here so you don\'t repeat them.' },
        { el: '.lastresult', title: 'Attempts left', text: 'This shows how many attempts are remaining.' },
        { el: null, title: 'Enjoy the 3D Background', text: 'The 3D scene reacts when you win or lose. Try guessing to see it animate!' }
    ];

    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    overlay.innerHTML = `
        <div class="tour-highlight" id="tour-highlight" aria-hidden="true"></div>
        <div class="tour-tooltip" id="tour-tooltip">
            <div id="tour-title" style="font-weight:700;margin-bottom:6px"></div>
            <div id="tour-text"></div>
            <div class="tour-controls">
                <button id="tour-prev" class="button small">Prev</button>
                <button id="tour-next" class="button small">Next</button>
                <button id="tour-close" class="button small">Close</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);

    const highlight = overlay.querySelector('#tour-highlight');
    const tooltip = overlay.querySelector('#tour-tooltip');
    const titleEl = overlay.querySelector('#tour-title');
    const textEl = overlay.querySelector('#tour-text');
    const btnPrev = overlay.querySelector('#tour-prev');
    const btnNext = overlay.querySelector('#tour-next');
    const btnClose = overlay.querySelector('#tour-close');

    let idx = 0;

    function showStep(i){
        idx = i;
        const step = steps[i];
        titleEl.textContent = step.title;
        textEl.innerHTML = step.text;
        overlay.style.display = 'flex';

        if (!step.el) {
            // center tooltip
            highlight.style.display = 'none';
            tooltip.style.left = '50%';
            tooltip.style.top = '50%';
            tooltip.style.transform = 'translate(-50%,-50%)';
            return;
        }

        const target = document.querySelector(step.el.startsWith('.') || step.el.startsWith('#') ? step.el : `#${step.el}`);
        if (!target) {
            highlight.style.display = 'none';
            tooltip.style.left = '50%';
            tooltip.style.top = '50%';
            tooltip.style.transform = 'translate(-50%,-50%)';
            return;
        }

        const rect = target.getBoundingClientRect();
        const pad = 12;
        highlight.style.display = 'block';
        highlight.style.left = (rect.left - pad) + 'px';
        highlight.style.top = (rect.top - pad) + 'px';
        highlight.style.width = (rect.width + pad*2) + 'px';
        highlight.style.height = (rect.height + pad*2) + 'px';
        highlight.style.borderRadius = window.getComputedStyle(target).borderRadius || '8px';

        // position tooltip smartly (prefer right, else top)
        const ttW = 340;
        let left = rect.right + 14;
        let top = rect.top + window.scrollY;
        // if out of viewport, place above
        if (left + ttW > window.innerWidth) {
            left = rect.left;
            top = rect.bottom + 14 + window.scrollY;
        }
        tooltip.style.left = (left) + 'px';
        tooltip.style.top = (top) + 'px';
        tooltip.style.transform = 'translateY(0)';
    }

    btnPrev.addEventListener('click', ()=>{ if (idx>0) showStep(idx-1); });
    btnNext.addEventListener('click', ()=>{ if (idx < steps.length-1) showStep(idx+1); else endTour(); });
    btnClose.addEventListener('click', endTour);
    overlay.addEventListener('click', (e)=>{ if (e.target === overlay) endTour(); });

    function endTour(){ overlay.style.display = 'none'; }

    window.startTour = function(){ showStep(0); };
    // expose for tests if needed
    window.tour = { start: window.startTour, end: endTour };

    // wire 'Take a Tour' button if present
    const tourBtn = document.getElementById('startTour');
    if (tourBtn) tourBtn.addEventListener('click', (e)=>{ e.preventDefault(); window.startTour(); });

})();
