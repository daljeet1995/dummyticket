(function(){
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const WEEK = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    let activeInput = null;
    let calendar = null;
    let viewDate = new Date();
    let viewMode = 'date';
    let yearStart = null;

    function pad(n){ return String(n).padStart(2,'0'); }

    function toYMD(date){
        return date.getFullYear() + '-' + pad(date.getMonth()+1) + '-' + pad(date.getDate());
    }

    function parseDate(value){
        if(!value) return null;
        value = String(value).trim().replace(/\//g,'-');
        let m;
        if((m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/))){
            return new Date(Number(m[1]), Number(m[2])-1, Number(m[3]));
        }
        if((m = value.match(/^(\d{2})-(\d{2})-(\d{4})$/))){
            return new Date(Number(m[3]), Number(m[2])-1, Number(m[1]));
        }
        return null;
    }

    function startOfDay(date){
        const d = new Date(date);
        d.setHours(0,0,0,0);
        return d;
    }

    function getMinDate(input){
        const minValue = input.dataset.minDate || '';
        if(minValue === 'today') return startOfDay(new Date());
        return parseDate(minValue) ? startOfDay(parseDate(minValue)) : null;
    }

    function isDisabled(date){
        if(!activeInput) return false;
        const minDate = getMinDate(activeInput);
        if(!minDate) return false;
        return startOfDay(date) < minDate;
    }

    function positionCalendar(){
        if(!calendar || !activeInput) return;
        const rect = activeInput.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        let left = rect.left + scrollLeft;
        let top = rect.bottom + scrollTop + 8;
        calendar.style.left = left + 'px';
        calendar.style.top = top + 'px';
    }

    function openCalendar(input){
        activeInput = input;
        const selected = parseDate(input.value);
        const minDate = getMinDate(input);
        viewDate = selected || minDate || new Date();
        viewMode = 'date';
        yearStart = Math.floor(viewDate.getFullYear() / 12) * 12;
        if(!calendar){
            calendar = document.createElement('div');
            calendar.className = 'df-calendar-wrap';
            document.body.appendChild(calendar);
        }
        renderCalendar();
        positionCalendar();
    }

    function closeCalendar(){
        if(calendar){ calendar.remove(); calendar = null; }
        activeInput = null;
    }

    function changeView(step){
        if(viewMode === 'date'){
            viewDate.setMonth(viewDate.getMonth() + step);
        }else if(viewMode === 'month'){
            viewDate.setFullYear(viewDate.getFullYear() + step);
        }else{
            yearStart += step * 12;
        }
        renderCalendar();
    }

    function renderCalendar(){
        if(!calendar || !activeInput) return;
        if(viewMode === 'month') return renderMonthView();
        if(viewMode === 'year') return renderYearView();
        renderDateView();
    }

    function headerHtml(monthLabel, yearLabel){
        return `
            <div class="df-calendar-head">
                <button type="button" class="df-cal-nav" data-action="prev">‹</button>
                <button type="button" class="df-cal-title-btn" data-action="monthView">${monthLabel}</button>
                <button type="button" class="df-cal-title-btn" data-action="yearView">${yearLabel}</button>
                <button type="button" class="df-cal-nav" data-action="next">›</button>
            </div>
        `;
    }

    function renderDateView(){
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const first = new Date(year, month, 1);
        const start = new Date(year, month, 1 - first.getDay());
        const selected = parseDate(activeInput.value);
        const today = startOfDay(new Date());
        let html = headerHtml(MONTHS[month], year);
        html += '<div class="df-week-row">' + WEEK.map(w => `<div>${w}</div>`).join('') + '</div>';
        html += '<div class="df-days-grid">';
        for(let i=0;i<42;i++){
            const d = new Date(start);
            d.setDate(start.getDate()+i);
            const classes = ['df-day'];
            if(d.getMonth() !== month) classes.push('outside');
            if(toYMD(d) === toYMD(today)) classes.push('today');
            if(selected && toYMD(d) === toYMD(selected)) classes.push('selected');
            if(isDisabled(d)) classes.push('disabled');
            html += `<button type="button" class="${classes.join(' ')}" data-date="${toYMD(d)}">${d.getDate()}</button>`;
        }
        html += '</div>';
        html += footerHtml();
        calendar.innerHTML = html;
    }

    function renderMonthView(){
        const year = viewDate.getFullYear();
        const selected = parseDate(activeInput.value);
        let html = headerHtml('Select Month', year);
        html += '<div class="df-month-grid">';
        for(let m=0;m<12;m++){
            const classes = ['df-month'];
            if(selected && selected.getFullYear() === year && selected.getMonth() === m) classes.push('selected');
            html += `<button type="button" class="${classes.join(' ')}" data-month="${m}">${MONTHS_SHORT[m]}</button>`;
        }
        html += '</div>' + footerHtml();
        calendar.innerHTML = html;
    }

    function renderYearView(){
        if(yearStart === null) yearStart = Math.floor(viewDate.getFullYear()/12)*12;
        const selected = parseDate(activeInput.value);
        let html = headerHtml(yearStart + ' - ' + (yearStart + 11), 'Years');
        html += '<div class="df-year-grid">';
        for(let y=yearStart;y<yearStart+12;y++){
            const classes = ['df-year'];
            if(selected && selected.getFullYear() === y) classes.push('selected');
            html += `<button type="button" class="${classes.join(' ')}" data-year="${y}">${y}</button>`;
        }
        html += '</div>' + footerHtml();
        calendar.innerHTML = html;
    }

    function footerHtml(){
        return `
            <div class="df-cal-footer">
                <button type="button" class="df-today-btn" data-action="today">Today</button>
                <button type="button" class="df-clear-btn" data-action="clear">Clear</button>
            </div>
        `;
    }

    function selectDate(dateValue){
        const d = parseDate(dateValue);
        if(!d || isDisabled(d)) return;
        activeInput.value = toYMD(d);
        activeInput.dispatchEvent(new Event('change', {bubbles:true}));
        closeCalendar();
    }

    function bindInput(input, minDate){
        if(!input || input.dataset.indexCalendarReady === '1') return;
        input.dataset.indexCalendarReady = '1';
        input.dataset.minDate = minDate || 'today';
        input.setAttribute('autocomplete','off');
        input.addEventListener('focus', () => openCalendar(input));
        input.addEventListener('click', () => openCalendar(input));
    }

    window.initDatePickers = function(scope){
        scope = scope || document;
        if(scope.querySelector){
            bindInput(document.getElementById('departureDate'), 'today');
            bindInput(document.getElementById('returnDate'), document.getElementById('departureDate')?.value || 'today');

            scope.querySelectorAll('.multiDate').forEach(el => bindInput(el, 'today'));
            scope.querySelectorAll('.checkin').forEach(el => bindInput(el, 'today'));
            scope.querySelectorAll('.checkout').forEach(el => {
                const cin = el.closest('.hotel-row')?.querySelector('.checkin');
                bindInput(el, cin?.value || 'today');
            });
        }
    };

    document.addEventListener('change', function(e){
        if(e.target && e.target.id === 'departureDate'){
            const returnInput = document.getElementById('returnDate');
            if(returnInput){
                returnInput.dataset.minDate = e.target.value || 'today';
                const rDate = parseDate(returnInput.value);
                const min = parseDate(returnInput.dataset.minDate);
                if(rDate && min && startOfDay(rDate) < startOfDay(min)) returnInput.value = '';
            }
        }

        if(e.target && e.target.classList.contains('checkin')){
            const checkout = e.target.closest('.hotel-row')?.querySelector('.checkout');
            if(checkout){
                checkout.dataset.minDate = e.target.value || 'today';
                const cDate = parseDate(checkout.value);
                const min = parseDate(checkout.dataset.minDate);
                if(cDate && min && startOfDay(cDate) < startOfDay(min)) checkout.value = '';
            }
        }
    });

    document.addEventListener('click', function(e){
        if(!calendar) return;

        const action = e.target.getAttribute('data-action');
        if(action === 'prev'){ changeView(-1); return; }
        if(action === 'next'){ changeView(1); return; }
        if(action === 'monthView'){ viewMode = 'month'; renderCalendar(); return; }
        if(action === 'yearView'){
            viewMode = 'year';
            yearStart = Math.floor(viewDate.getFullYear()/12)*12;
            renderCalendar();
            return;
        }
        if(action === 'today'){
            const today = new Date();
            if(!isDisabled(today)) selectDate(toYMD(today));
            return;
        }
        if(action === 'clear'){
            activeInput.value = '';
            activeInput.dispatchEvent(new Event('change', {bubbles:true}));
            closeCalendar();
            return;
        }

        if(e.target.matches('.df-day') && !e.target.classList.contains('disabled')){
            selectDate(e.target.dataset.date);
            return;
        }

        if(e.target.matches('.df-month')){
            viewDate.setMonth(Number(e.target.dataset.month));
            viewMode = 'date';
            renderCalendar();
            return;
        }

        if(e.target.matches('.df-year')){
            viewDate.setFullYear(Number(e.target.dataset.year));
            viewMode = 'month';
            renderCalendar();
            return;
        }

        if(!e.target.closest('.df-calendar-wrap') && !e.target.classList.contains('date-input')){
            closeCalendar();
        }
    });

    window.addEventListener('resize', positionCalendar);
    window.addEventListener('scroll', positionCalendar, true);
})();
