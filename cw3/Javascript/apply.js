document.addEventListener('DOMContentLoaded', function() {
    const opticalHeading = document.querySelector('.Optical_Sensing_Division h3');
    const bioHeading = document.querySelector('.Bio-Sensing_Division h3');
    const smartHeading = document.querySelector('.Smart_Sensing_Division h3');
    const opticalForms = document.querySelector('.Optical_Sensing_Division .division-forms');
    const bioForms = document.querySelector('.Bio-Sensing_Division .division-forms');
    const smartForms = document.querySelector('.Smart_Sensing_Division .division-forms');

    function handleHeadingClick(activeHeading, activeForms) {
        [opticalHeading, bioHeading, smartHeading].forEach(heading => {
            heading.style.backgroundColor = heading === activeHeading ? 'white' : '#cce5ff';
        });
        [opticalForms, bioForms, smartForms].forEach(forms => {
            forms.style.display = forms === activeForms ? 'flex' : 'none';
        });
    }

    opticalHeading.addEventListener('click', () => handleHeadingClick(opticalHeading, opticalForms));
    bioHeading.addEventListener('click', () => handleHeadingClick(bioHeading, bioForms));
    smartHeading.addEventListener('click', () => handleHeadingClick(smartHeading, smartForms));

    function isIntegerInput(input) {
        if (!input || input.trim() === '') return false;
        const num = parseInt(input.trim());
        return !isNaN(num) && num.toString() === input.trim();
    }

    function checkDuplicateGroup(targetGroup) {
        const tableBody = document.querySelector('#choice-table tbody');
        for (let i = 1; i <= 10; i++) {
            const row = tableBody.children[i - 1];
            const existingGroup = row.cells[1].textContent.trim();
            if (existingGroup === targetGroup) {
                return true;
            }
        }
        return false;
    }

    function checkDuplicateRank(targetRank) {
        const tableBody = document.querySelector('#choice-table tbody');
        const row = tableBody.children[targetRank - 1];
        return row.cells[0].textContent.trim() !== '';
    }

    function getOrdinalNumber(rank) {
        const ordinals = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
        return ordinals[rank - 1] || '';
    }

    function checkRankGaps() {
        const tableBody = document.querySelector('#choice-table tbody');
        const chosenRanks = [];
        for (let i = 1; i <= 10; i++) {
            const row = tableBody.children[i - 1];
            if (row.cells[0].textContent.trim() !== '') {
                chosenRanks.push(i);
            }
        }
        if (chosenRanks.length === 0) return [];
        const maxChosenRank = Math.max(...chosenRanks);
        const gapRanks = [];
        for (let i = 1; i < maxChosenRank; i++) {
            if (!chosenRanks.includes(i)) {
                gapRanks.push(getOrdinalNumber(i));
            }
        }
        return gapRanks;
    }

    function createSubmitAreaAlert(message, type = 'error') {
        const submitArea = document.getElementById('submit-application').parentNode;
        const existingAlert = document.querySelector('.submit-area-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertEl = document.createElement('div');
        alertEl.className = 'submit-area-alert';
        alertEl.textContent = message;
        alertEl.style.cssText = `
            color: ${type === 'error' ? '#dc3545' : '#28a745'};
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
            width: 100%;
        `;

        submitArea.appendChild(alertEl);

        setTimeout(() => {
            alertEl.remove();
        }, 3000);
    }

    const tableBody = document.querySelector('#choice-table tbody');
    const choiceCountEl = document.getElementById('choice-count');
    const lastModifiedEl = document.getElementById('last-modified');

    function bindRankButtons() {
        const rankButtons = document.querySelectorAll('.submit-rank');
        rankButtons.forEach(button => {
            button.removeEventListener('click', handleRankSubmit);
            button.addEventListener('click', handleRankSubmit);
        });
    }

    function handleRankSubmit(e) {
        const form = e.target.closest('.group-form');
        if (!form) return;

        const rankInput = form.querySelector('.rank-input');
        const division = form.dataset.division;
        const group = form.dataset.group;

        let rank_input = rankInput.value.trim();

        if (!isIntegerInput(rank_input)) {
            alert("Please enter the rank of chosen group");
            rankInput.focus();
            return;
        }

        let rank = parseInt(rank_input);

        if (rank < 1 || rank > 10) {
            alert("Please enter the rank of chosen group between 1 and 10");
            rankInput.focus();
            return;
        }

        if (checkDuplicateGroup(group)) {
            alert("You have already chosen this group");
            rankInput.focus();
            return;
        }

        if (checkDuplicateRank(rank)) {
            alert("You have already chosen this rank");
            rankInput.focus();
            return;
        }

        const targetRow = tableBody.children[rank - 1];
        targetRow.cells[0].textContent = division;
        targetRow.cells[1].textContent = group;

        let choiceCount = 0;
        for (let i = 0; i < tableBody.children.length; i++) {
            if (tableBody.children[i].cells[0].textContent.trim() !== '') {
                choiceCount++;
            }
        }
        choiceCountEl.textContent = choiceCount;

        const now = new Date();
        const formattedTime = now.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/\//g, '-');
        lastModifiedEl.textContent = formattedTime;

        const ordinal = getOrdinalNumber(rank);
        alert(`You have chosen ${group} as your ${ordinal} chosen group in ${division} successfully`);

        rankInput.value = '';
    }

    bindRankButtons();

    const clearBtn = document.getElementById('clear-application');
    clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        for (let i = 0; i < tableBody.children.length; i++) {
            tableBody.children[i].cells[0].textContent = '';
            tableBody.children[i].cells[1].textContent = '';
        }
        choiceCountEl.textContent = '0';
        lastModifiedEl.textContent = '--';
        alert("All choices have been cleared successfully");
    });

    const submitBtn = document.getElementById('submit-application');
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let choiceCount = 0;
        const tableBody = document.querySelector('#choice-table tbody');
        for (let i = 0; i < tableBody.children.length; i++) {
            if (tableBody.children[i].cells[0].textContent.trim() !== '') {
                choiceCount++;
            }
        }

        if (choiceCount === 0) {
            createSubmitAreaAlert("You have not chosen any group.", 'error');
            return;
        }

        const gapRanks = checkRankGaps();
        if (gapRanks.length > 0) {
            const gapText = gapRanks.join(', ');
            const gapMessage = `You have not chosen your ${gapText} chosen groups, you can not leave any gap between your chosen groups`;
            createSubmitAreaAlert(gapMessage, 'error');
            return;
        }

        const now = new Date();
        const submitTime = now.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/\//g, '-');
        const successMessage = `You have successfully submitted your application at time ${submitTime}`;
        createSubmitAreaAlert(successMessage, 'success');
    });
});