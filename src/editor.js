// dirty editor for ld37
import qs from 'qs';

const __characters = require('./config/characters')

const {tileSize, gameWidth, gameHeight} = require('./config/options')
const y = Math.floor(gameHeight/tileSize);
const x = Math.floor(gameWidth/tileSize);

const getBaseGrid =() => new Array(y).fill(1).map(() => new Array(x).fill(0));

const charsByName = [
  '',
  'pork',
  'pulpo',
  'tentacle',
  'cockie',
  'jasam',
  'tresojos',
  'ciclope',
  'arrugado',
  'tiritas',
  'pajaro',
  'wheeler',
  'tiocosas',
  'huesos'
]

let $ = window.$;
let state = {
  x,
  y,
  name: '',
  end: null,
  map: null
};
let selectedTool = null;

$(document).on('ready', () => {
  onChangeGridSize();
  setToolImages();

  $(document).on('keypress', function(e){
    let controlIndex = e.keyCode - 49;
    let btn = $('#cell-types button').get(controlIndex);
    if(btn){
      btn.click();
    }
  });

  $('#grid-container').on('mouseenter', 'td', onHoverGridCellIn);
  $('#grid-container').on('mouseleave', 'td', onHoverGridCellOut);
  $('#grid-container').on('click', 'td', onClickGridCell);

  $('.tool').on('click', function(e){
    e.preventDefault();

    const clickedTool = parseInt($(this).data('tiletype'));
    if (clickedTool === 100) {
      if (selectedTool > 0 && selectedTool < 100) {
        state.end = state.end || {};
        if (state.end.character !== charsByName[selectedTool]){
          removeTarget();
          refreshControlsFromState();
        }
        state.end.character = charsByName[selectedTool];
        setToolImages();
      }
      else {
        alert('Click on a Tool Character first and then click here again')
      }
      return;
    }

    selectedTool = clickedTool

    $('.tool:not(.start)').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#export').on('click', function(e){
    e.preventDefault();
    let level = getLevelFromState(state);
    $('#export-text').val(level);
    $('#test-link').attr('href', `${location.href.replace('editor.html', '')}#${qs.stringify({levelData: level})}`);
    $('#export-modal').modal('show');
  });

  $('#import').on('click', function(e){
    e.preventDefault();
    $('#import-modal').modal('show');
  });

  $('#process-import').on('click', function(e){
    e.preventDefault();
    let level;
    try {
      level = JSON.parse($('#import-text').val());
    } catch (e) {
      window.alert('bad json');
    }
    refreshState(level);
    refreshControlsFromState();
    refreshExportButton();
    $('#import-modal').modal('hide');
  });

  $('#export-text').on('focus', function(){
    $(this).select();
  });

  $('#level-name').on('keyup', function() {
    state.name = $(this).val();
    refreshExportButton();
  });

});

function setAlien(alien) {
  const shape = __characters[alien.character].shape
  const pos = alien.position

  const value = charsByName.indexOf(alien.character);

  // Complete the shape for reference
  shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      state.map[i + pos[1]][j + pos[0]] = value
    })
  })

  state.map[pos[1]][pos[0]] = {
    value,
    character: alien.character
  }
}

function removeAlien(alien) {
  const shape = __characters[alien.character].shape
  const pos = alien.position
  const value = charsByName.indexOf(alien.character);

  // Complete the shape for reference
  shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (state.map[i + pos[1]][j + pos[0]] === value){
        state.map[i + pos[1]][j + pos[0]] = 0;
      }
    })
  })

  state.map[pos[1]][pos[0]] = 0;
}

function setTarget(target){
  removeTarget();

  state.end = target;
  const shape = __characters[target.character].shape
  const pos = target.position

  shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      state.map[i + pos[1]][j + pos[0]] = 900
    })
  })
}

function removeTarget() {
  if (!state.end || !state.end.position) return;
  state.end.position = null;

  state.map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 900) {
        state.map[i][j] = 0;
      }
    });
  });

}

function refreshState(level){
  state.map = getBaseGrid();
  level.aliens.forEach(setAlien)
  setTarget(level.target)
}

function refreshControlsFromState(){
  let $grid = $('<table>');
  for(let i = 0; i < state.y; i++){
    let $row = $('<tr>');

    for(let j = 0; j < state.x; j++){
      let value = state.map[i][j];
      let character;
      if (isNaN(value)) {
        character = value.character;
        value = value.value;
      }

      const charCSS = character ? 'char-' + character : '';
      const css = `${'opt' + value} ${charCSS}`;
      let $td = $(`<td data-location="${j}-${i}" class="${css}" >`);

      $row.append($td);
    }
    $grid.append($row);
  }

  $('#grid-container').html($grid);
  $('#level-name').val(state.name);
  setToolImages();
}

function getLevelFromState(state){

  const aliens = []
  state.map.forEach((row, j) => {
    row.forEach((cell, i) => {
      if (cell && isNaN(cell) && cell.character) {
        aliens.push({
          character: cell.character,
          position: [i, j]
        })
      }
    });
  });

  let data = {
    name: state.name,
    target: state.end,
    aliens
  };
  return JSON.stringify(data);
}

function refreshExportButton(){
  let $exportButton = $('#export, #test-link');
  if(!validate()){
    $exportButton.attr('disabled', 'disabled');
  }
  else {
    $exportButton.removeAttr('disabled');
    let level = getLevelFromState(state);
    $('#test-link').attr('href', `${location.href.replace('editor.html', '')}#${qs.stringify({levelData: level})}`);
  }
}

function validate(){
  return state.name && state.end && state.end.character && state.end.position;
}

function onHoverGridCellIn(e){

}

function onHoverGridCellOut(e){

}

function onClickGridCell(e){
  let isDelete = e.ctrlKey;
  let tool;
  let cell = $(this)

  if(selectedTool === null || isDelete){
    tool = 0;
  }
  else {
    tool = selectedTool;
  }

  const position = cell.data('location').split('-').map((x) => parseInt(x));

  if (tool === 0) {
    const cssClass = cell.attr('class')
    if (cssClass.indexOf('char-') > -1){
      removeAlien({
        position,
        character: cssClass.split(' ').reduce((result, item) => {
          if (item.indexOf('char-') > -1) return item.split('-')[1];
        }, '')
      })

    }
    else if (cell.hasClass('opt900')) {
      removeTarget()
    }
  }
  else if(tool === 900){ // target
    if (!state.end || !state.end.character) return alert('set a character first!')
    setTarget({
      character: state.end.character,
      position
    })
  }
  else {
    setAlien({
      character: charsByName[tool],
      position
    })
  }

  refreshControlsFromState();
  refreshExportButton();
}

function onChangeGridSize(){
  if(!state.x || !state.y){
    return;
  }
  if(!state.map){
    state.map = [];
  }
  let $grid = $('<table>');
  for(let i = 0; i < state.y; i++){
    let $row = $('<tr>');
    state.map[i] = [];
    for(let j = 0; j < state.x; j++){
      $row.append(`<td data-location="${j}-${i}">`);
      state.map[i].push(0);
    }
    $grid.append($row);
  }
  $('#grid-container').html($grid);
  refreshExportButton();
}

function setToolImages() {
  $('.btn.tool').each( function() {
    const btn = $(this);
    const value = parseInt(btn.attr('data-tileType'), 10);
    if (value > 0 && value < 100) {
      const sprite = __characters[charsByName[value]].sprite
      btn.css({
        backgroundImage: `url('/assets/spritesheets/${sprite}.png')`
      }).attr('title', sprite)
    }
    else if (value === 100 && state.end && state.end.character) {
      const sprite = __characters[state.end.character].sprite

      btn
        .removeClass (function (index, css) {
          return (css.match (/(^|\s)opt\S+/g) || []).join(' ');
        })
        .addClass(`opt${charsByName.indexOf(state.end.character)} selected`)
        .css({
          backgroundImage: `url('/assets/spritesheets/${sprite}.png')`
        })
        .attr('title', sprite)
    }
    else if(value === 900) {
      if (state.end && state.end.character) {
        btn.removeAttr('disabled');
      }
      else {
        btn.attr('disabled', 'disabled');
      }
    }
  })
}
