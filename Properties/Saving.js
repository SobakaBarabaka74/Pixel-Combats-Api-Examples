// Сохранения значений
// Например сохранить очки игрока при выходе, и вернуть игроку при входе на сервер


const props = Properties.GetContext();

// Создаём двумерный массив с параметрами сохранения
// Во вложенном массиве: индекс 0: имя свойства, например Kills, индекс 2: значение по умолчанию
const save_data = [['Kills', 0], ['Scores', 0], ['Deaths', 0], ['Spawns', 0]];

// Создаём функцию чтения сохранения дабы не переписывать код
function read(p) {
  save_data.forEach(function(prop) {
     p.Properties.Get(prop[0]).Value = props.Get(prop[0] + p.id).Value || prop[1];
  });
}

// Сохраняем значения на сервер при выходе игрока
Players.OnPlayerDisconnected.Add(function(p) {
  save_data.forEach(function(prop) {
    props.Get(prop[0] + p.id).Value = p.Properties.Get(prop[0]).Value;
  });
});

// Выдаёт сохранение игроку при заходе на сервер
Players.OnPlayerConnected.Add(function(p) {
  read(p);
});

// Поскольку событие Players.OnPlayerConnected не работает на игрока, в случаи если он создал сервер, то выдаём в событии выбора команды
Teams.OnRequestJoinTeam.Add(function(p) {
  if (p.IdInRoom == 1) {
    read(p);
  }
});


// Теперь все данные записаные в save_data будут сохранятся
// Удачного использования :) 
