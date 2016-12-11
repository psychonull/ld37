// dirty editor for ld37
import qs from 'qs';

const __characters = require('./config/characters')

const {tileSize, gameWidth, gameHeight} = require('./config/options')
const y = Math.floor(gameHeight/tileSize);
const x = Math.floor(gameWidth/tileSize);

const getBaseGrid =() => new Array(y).fill(1).map(() => new Array(x).fill(0));

let $ = window.$;
let state = {
  x,
  y,
  //start: null,
  end: null,
  map: null,
  author: null
};
let selectedTool = null;


$(document).on('ready', () => {

  // state.x = parseInt($('#x').val());
  // state.y = parseInt($('#y').val());
  onChangeGridSize();
/*
  $('#x, #y').on('change', function() {
    state[this.id] = parseInt($(this).val());
    onChangeGridSize();
  });

  $('#author').on('change', function(){
    state.author = $(this).val();
    refreshExportButton();
  });
*/
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
    selectedTool = parseInt($(this).data('tiletype'));
    $('.tool').removeClass('selected');
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


});

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

function refreshState(level){
  state.map = getBaseGrid();

  level.aliens.forEach(alien => {
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
  })

  state.end = level.target
  const shape = __characters[level.target.character].shape
  const pos = level.target.position

  shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      state.map[i + pos[1]][j + pos[0]] = 900
    })
  })
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
  return /*state.start &&*/ state.end;
}

function onHoverGridCellIn(e){

}

function onHoverGridCellOut(e){

}

function onClickGridCell(e){
  let isDelete = e.ctrlKey;
  let tool;
  if(selectedTool === null || isDelete){
    tool = 0;
  }
  else {
    tool = selectedTool;
  }
  let [x, y] = $(this).data('location').split('-').map((x) => parseInt(x));

  if(tool === 100 && !state.map[y][x]){
    console.warn('map start show be of a type ');
  }
  if(tool === 100 || tool === 900){
    $('#grid-container td').removeClass('opt' + tool);
    this.className += ' opt' + tool;
    // if(tool === 100){
    //   state.start = [x, y];
    // }
    if(tool === 900) {
      state.end = [x, y];
    }
  }
  else {
    this.className = 'opt' + tool;
    state.map[y][x] = tool;
  }
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
