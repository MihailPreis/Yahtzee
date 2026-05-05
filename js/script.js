'use strict';

// ========== 1. КОНФИГУРАЦИЯ ИГРЫ (JSON-подобный объект) ==========
const gameConfigs = {
    'yahtzee-classic': {
        name: 'Классический',
        sections: [
            {
                title: 'Верхняя секция',
                rows: [
                    { label: 'Единицы <span>⚀</span>', desc: 'Сумма "1"', key: 'ones', type: 'score' },
                    { label: 'Двойки <span>⚁</span>', desc: 'Сумма "2"', key: 'twos', type: 'score' },
                    { label: 'Тройки <span>⚂</span>', desc: 'Сумма "3"', key: 'threes', type: 'score' },
                    { label: 'Четверки <span>⚃</span>', desc: 'Сумма "4"', key: 'fours', type: 'score' },
                    { label: 'Пятерки <span>⚄</span>', desc: 'Сумма "5"', key: 'fives', type: 'score' },
                    { label: 'Шестерки <span>⚅</span>', desc: 'Сумма "6"', key: 'sixes', type: 'score' },
                    {
                        label: 'Сумма верхней секции', desc: '=', key: 'upperSum', type: 'computed',
                        compute: (p) => (p.ones || 0) + (p.twos || 0) + (p.threes || 0) + (p.fours || 0) + (p.fives || 0) + (p.sixes || 0)
                    },
                    {
                        label: 'Бонус (≥63)', desc: '+35 очков', key: 'bonus', type: 'computed',
                        compute: (p) => p.upperSum >= 63 ? 35 : 0
                    },
                    {
                        label: 'Итого верхняя секция', desc: '=', key: 'upperTotal', type: 'computed',
                        compute: (p) => p.upperSum + p.bonus
                    },
                ]
            },
            {
                title: 'Нижняя секция',
                rows: [
                    { label: 'Три одинаковых <span>⚃⚃⚃</span>', desc: 'Сумма всех', key: 'threeKind', type: 'score' },
                    { label: 'Четыре одинаковых <span>⚀⚀⚀⚀</span>', desc: 'Сумма всех', key: 'fourKind', type: 'score' },
                    { label: 'Фулл-хаус <span>⚃⚃⚃ ⚄⚄</span>', desc: '25 очков', key: 'fullHouse', type: 'score' },
                    { label: 'Малый стрит <span>⚀⚁⚂⚃⚄</span>', desc: '30 очков', key: 'smallStraight', type: 'score' },
                    { label: 'Большой стрит <span>⚁⚂⚃⚄⚅</span>', desc: '40 очков', key: 'largeStraight', type: 'score' },
                    { label: 'Yahtzee <span>⚅⚅⚅⚅⚅</span>', desc: '50 очков', key: 'yahtzee', type: 'score' },
                    { label: 'Шанс', desc: 'Сумма всех', key: 'chance', type: 'score' },
                    {
                        label: 'Сумма нижней секции', desc: '=', key: 'lowerSum', type: 'computed',
                        compute: (p) => (p.threeKind || 0) + (p.fourKind || 0) + (p.fullHouse || 0) + (p.smallStraight || 0) + (p.largeStraight || 0) + (p.yahtzee || 0) + (p.chance || 0)
                    },
                ]
            },
            {
                title: 'Итог',
                rows: [
                    {
                        label: 'Общий итог', desc: '=', key: 'grandTotal', type: 'computed',
                        compute: (p) => p.upperTotal + p.lowerSum
                    }
                ]
            }
        ]
    },
    'table-time': {
        name: 'Тейбл Тайм',
        sections: [
            {
                rows: [
                    { label: 'Единицы <span>⚀</span>', desc: 'Сумма "1"', key: 'ones', type: 'score' },
                    { label: 'Двойки <span>⚁</span>', desc: 'Сумма "2"', key: 'twos', type: 'score' },
                    { label: 'Тройки <span>⚂</span>', desc: 'Сумма "3"', key: 'threes', type: 'score' },
                    { label: 'Четверки <span>⚃</span>', desc: 'Сумма "4"', key: 'fours', type: 'score' },
                    { label: 'Пятерки <span>⚄</span>', desc: 'Сумма "5"', key: 'fives', type: 'score' },
                    { label: 'Шестерки <span>⚅</span>', desc: 'Сумма "6"', key: 'sixes', type: 'score' },
                    {
                        label: 'Сумма верхней секции', desc: '=', key: 'upperSum', type: 'computed',
                        compute: (p) => (p.ones || 0) + (p.twos || 0) + (p.threes || 0) + (p.fours || 0) + (p.fives || 0) + (p.sixes || 0)
                    },
                    {
                        label: 'Бонус (≥63)', desc: '+35 очков', key: 'bonus', type: 'computed',
                        compute: (p) => p.upperSum >= 63 ? 35 : 0
                    },
                    {
                        label: 'Итого верхняя секция', desc: '=', key: 'upperTotal', type: 'computed',
                        compute: (p) => p.upperSum + p.bonus
                    },
                ]
            },
            {
                rows: [
                    { label: 'Пара <span>⚄⚄</span>', desc: 'Сумма всех', key: 'twoKind', type: 'score' },
                    { label: 'Две пары <span>⚄⚄ ⚅⚅</span>', desc: 'Сумма всех', key: 'twoPair', type: 'score' },
                    { label: 'Сет <span>⚃⚃⚃</span>', desc: 'Сумма всех', key: 'threeKind', type: 'score' },
                    { label: 'Каре <span>⚀⚀⚀⚀</span>', desc: 'Сумма всех', key: 'fourKind', type: 'score' },
                    { label: 'Фулл-хаус <span>⚃⚃⚃ ⚄⚄</span>', desc: '25 очков', key: 'fullHouse', type: 'score' },
                    { label: 'М. Стрит <span>⚀⚁⚂⚃</span>', desc: '30 очков', key: 'smallStraight', type: 'score' },
                    { label: 'Б. Стрит <span>⚁⚂⚃⚄⚅</span>', desc: '40 очков', key: 'largeStraight', type: 'score' },
                    { label: 'ЯЦЗЫ <span>⚅⚅⚅⚅⚅</span>', desc: '50 очков', key: 'yahtzee', type: 'score' },
                    { label: 'Шанс', desc: 'Сумма всех', key: 'chance', type: 'score' },
                    {
                        label: 'Сумма нижней секции', desc: '=', key: 'lowerSum', type: 'computed',
                        compute: (p) => (p.twoKind || 0) + (p.twoPair || 0) + (p.threeKind || 0) + (p.fourKind || 0) + (p.fullHouse || 0) + (p.smallStraight || 0) + (p.largeStraight || 0) + (p.yahtzee || 0) + (p.chance || 0)
                    },
                ]
            },
            {
                title: 'Итог',
                rows: [
                    {
                        label: 'Общий итог', desc: '=', key: 'grandTotal', type: 'computed',
                        compute: (p) => p.upperTotal + p.lowerSum
                    }
                ]
            }
        ]
    }
};

// ========== 2. СОСТОЯНИЕ ИГРЫ ==========
const state = {
    currentConfigKey: 'table-time',
    playerCount: 2,
    players: [],
    initialized: false
};

// ========== 3. DOM-ЭЛЕМЕНТЫ ==========
const configSelect = document.getElementById('config-select');
const playerDecrementBtn = document.getElementById('decrement');
const playerIncrementBtn = document.getElementById('increment');
const playerCountDisplay = document.getElementById('player-count-display');
const resetBtn = document.getElementById('reset-scores');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const tableContainer = document.getElementById('table-container');

// ========== 4. ИНИЦИАЛИЗАЦИЯ ==========
function populateConfigSelector() {
    configSelect.innerHTML = '';
    for (const [key, config] of Object.entries(gameConfigs)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = config.name;
        configSelect.appendChild(option);
    }
    configSelect.value = state.currentConfigKey;
}

function initializePlayers(count) {
    state.playerCount = count;
    state.players = [];
    for (let i = 0; i < count; i++) {
        state.players.push({ name: `Игрок ${i + 1}` });
    }
}

function getConfig() {
    return gameConfigs[state.currentConfigKey];
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function resetAllScores() {
    const config = getConfig();
    const keys = getAllScoreKeys(config);
    state.players.some(player =>
        keys.some(key => player[key] = null)
    );
}

function hasAnyScore() {
    const config = getConfig();
    const keys = getAllScoreKeys(config);
    return state.players.some(player =>
        keys.some(key => player[key] != null)
    );
}

function saveState() {
    if (!state.initialized) return;
    const toSave = {
        configKey: state.currentConfigKey,
        playerCount: state.playerCount,
        players: state.players.map(p => ({ ...p }))
    };
    localStorage.setItem('yahtzee-state', JSON.stringify(toSave));
    console.debug(`Game state saved`);
}

function loadState() {
    const raw = localStorage.getItem('yahtzee-state');
    if (!raw) return false;
    try {
        const saved = JSON.parse(raw);
        if (saved && gameConfigs[saved.configKey]) {
            state.currentConfigKey = saved.configKey;
            const loadedPlayers = saved.players || [];
            state.playerCount = Math.min(8, Math.max(1, loadedPlayers.length));
            state.players = [];
            for (let i = 0; i < state.playerCount; i++) {
                if (i < loadedPlayers.length) {
                    state.players.push({ ...loadedPlayers[i] });
                } else {
                    state.players.push({ name: `Игрок ${i + 1}` });
                }
            }
            console.debug(`Game state loaded`);
            return true;
        }
    } catch (e) {
        console.error(`Loading game state failure: ${e}`);
        localStorage.removeItem('yahtzee-state');
    }
    return false;
}

function getAllScoreKeys(config) {
    const keys = [];
    config.sections.forEach(section => {
        section.rows.forEach(row => {
            if (row.type === 'score') keys.push(row.key);
        });
    });
    return keys;
}

// ========== 5. ПЕРЕСЧЁТ ВЫЧИСЛЯЕМЫХ ЗНАЧЕНИЙ ==========
function recalcAll() {
    const config = getConfig();
    state.players.forEach(player => {
        config.sections.forEach(section => {
            section.rows.forEach(row => {
                if (row.type === 'computed') {
                    player[row.key] = row.compute(player);
                }
            });
        });
    });
    updateComputedCells();
}

// ========== 6. ОТРИСОВКА ТАБЛИЦЫ ==========
function renderTable() {
    const config = getConfig();
    const playerCount = state.playerCount;

    let html = '<table class="table table-sm">';

    // Шапка
    html += `
    <thead>
        <tr class="table-primary">
            <th scope="col"></th>
            <th scope="col">Очки</th>
    `;
    for (let i = 1; i <= playerCount; i++) {
        html += `
        <th scope="col">
            <input class="form-control form-control-sm" type="text" data-player="${i - 1}" value="${escapeHtml(state.players[i - 1]?.name || `Игрок ${i}`)}">
        </th>
        `;
    }
    html += `
        </tr>
    </thead>
    `;

    // Тело
    html += '<tbody>';
    config.sections.forEach(section => {
        section.rows.forEach(row => {
            if (row.type === 'computed' || row.key.includes('Total')) {
                html += `<tr class="table-info">`;
                html += `<th>${row.label}</th>`;
            } else {
                html += '<tr>';
                html += `<td>${row.label}</td>`;
            }
            html += `<td>${row.desc}</td>`;
            for (let p = 0; p < playerCount; p++) {
                if (row.type === 'score') {
                    // Поле ввода
                    const value = state.players[p]?.[row.key] ?? '';
                    html += `
                    <td>
                        <input class="form-control form-control-sm" type="number" min="0" max="99" data-player="${p}" data-key="${row.key}" value="${value}" style="width: 55px">
                    </td>`;
                } else {
                    // Вычисляемое поле
                    const value = state.players[p]?.[row.key] ?? 0;
                    html += `<td class="computed-cell" data-player="${p}" data-key="${row.key}">${value}</td>`;
                }
            }
            html += '</tr>';
        });
    });
    html += `
        </tbody>
    </table>
    `;

    tableContainer.innerHTML = html;

    // Навешиваем обработчики на все инпуты
    document.querySelectorAll('.table input[type="number"]').forEach(input => {
        input.addEventListener('input', handleScoreInput);
    });
    document.querySelectorAll('.table input[type="text"]').forEach(input => {
        input.addEventListener('input', handleUserNameInput);
        input.addEventListener('blur', handleUserNameBlur);
    });
}

function updateComputedCells() {
    document.querySelectorAll('.computed-cell').forEach(cell => {
        const playerIdx = parseInt(cell.dataset.player, 10);
        const key = cell.dataset.key;
        const value = state.players[playerIdx]?.[key];
        cell.textContent = value !== undefined ? value : 0;
    });
}

// ========== 7. ОБРАБОТЧИКИ СОБЫТИЙ ==========
function handleScoreInput(event) {
    const input = event.target;
    const playerIdx = parseInt(input.dataset.player, 10);
    const key = input.dataset.key;
    let value = input.value.trim() === '' ? null : parseInt(input.value, 10);

    // Защита от NaN и отрицательных
    if (value !== null && (isNaN(value) || value < 0)) {
        input.value = state.players[playerIdx]?.[key] ?? '';
        return;
    }

    if (value !== null) {
        value = Math.max(0, Math.min(value, 99))
        input.value = value
    }

    state.players[playerIdx][key] = value;
    recalcAll();
    saveState();
    updateResetButton();
}

function handleUserNameInput(event) {
    const input = event.target;
    const playerIdx = parseInt(input.dataset.player, 10);
    state.players[playerIdx].name = input.value.trim();
}

function handleUserNameBlur(event) {
    const input = event.target;
    const playerIdx = parseInt(input.dataset.player, 10);
    if (!input.value.trim()) {
        const defaultName = `Игрок ${playerIdx + 1}`;
        state.players[playerIdx].name = defaultName;
        input.value = defaultName;
    }
}

function changePlayerCount(delta) {
    const newCount = state.playerCount + delta;
    if (newCount < 1 || newCount > 8) return;

    const oldPlayers = state.players;
    state.playerCount = newCount;
    state.players = [];

    // Переносим данные для существующих игроков
    for (let i = 0; i < newCount; i++) {
        if (i < oldPlayers.length) {
            state.players.push({ ...oldPlayers[i] });
        } else {
            state.players.push({});
        }
    }

    playerCountDisplay.textContent = newCount;
    renderTable();
    recalcAll();
    saveState();
    updateResetButton();
}

function changeConfig(configKey) {
    if (state.currentConfigKey === configKey) return;
    state.currentConfigKey = configKey;
    resetAllScores();
    renderTable();
    recalcAll();
    saveState();
    updateResetButton();
}

function resetAll() {
    resetAllScores();
    renderTable();
    recalcAll();
    saveState();
    updateResetButton();
}

function resetGame() {
    initializePlayers(2);
    playerCountDisplay.textContent = state.playerCount;
    configSelect.value = state.currentConfigKey;
    resetAll();
}

function resetButtonAction() {
    if (hasAnyScore()) {
        resetAll();
    } else {
        resetGame();
    }
}

function updateResetButton() {
    if (hasAnyScore()) {
        resetBtn.title = 'Сбросить все введённые очки';
    } else {
        resetBtn.title = 'Вернуть игру в исходное состояние (2 игрока, базовые имена)';
    }
}

// ========== 8. СТАРТ ==========
document.addEventListener('DOMContentLoaded', () => {
    const restored = loadState();
    if (!restored) {
        initializePlayers(state.playerCount);
    }
    state.initialized = true;

    state.playerCount = state.players.length;
    playerCountDisplay.textContent = state.playerCount;

    populateConfigSelector();
    configSelect.value = state.currentConfigKey;

    renderTable();
    recalcAll();
    saveState();
    updateResetButton();

    configSelect.addEventListener('change', (e) => {
        console.debug(`Config: ${e.target.value}`);
        changeConfig(e.target.value);
    });

    playerDecrementBtn.addEventListener('click', () => changePlayerCount(-1));
    playerIncrementBtn.addEventListener('click', () => changePlayerCount(1));
    resetBtn.addEventListener('click', () => resetButtonAction());

    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    });
});
