'use strict'

const spells = {
  'Missile': {
    cost: 53,
    name: 'Missile',
    duration: 1,
    damage: 4
  },
  'Shield': {
    cost: 113,
    name: 'Shield',
    duration: 6,
    armor: 7
  },
  'Drain': {
    cost: 73,
    name: 'Drain',
    duration: 1,
    heal: 2,
    damage: 2
  },
  'Poison': {
    cost: 173,
    name: 'Poison',
    duration: 6,
    damage: 3
  },
  'Recharge': {
    cost: 229,
    name: 'Recharge',
    duration: 5,
    mana: 101
  },
}

const spellNames = Object.keys(spells)

const turn = (modifier, spell) => {
  if (spell.active > 0) {
    modifier.damage = modifier.damage + (spell.damage || 0)
    modifier.armor = modifier.armor + (spell.armor || 0)
    modifier.hp = modifier.hp + (spell.heal || 0)
    modifier.mana = modifier.mana + (spell.mana || 0)
  }

  return modifier;
}

let min = 1000000

function simulate(oldPlayer, oldBoss, depth) {
  depth = depth || 1
  oldBoss = oldBoss || { hp: 51, damage: 9 }
  oldPlayer = oldPlayer || { hp: 50, mana: 500, armor: 0, spent: 0, history: [] }
  for (const name of spellNames) {
    const spell = Object.assign({}, spells[name]);
    const casted = oldPlayer.history.filter(s => s.active > 0).filter(s => s.name === spell.name)
    if (casted.length) continue

    let player;
    if (oldPlayer.mana >= spell.cost) {
      player = Object.assign({}, oldPlayer, {
        history: oldPlayer.history.concat(spell),
        mana: oldPlayer.mana - spell.cost,
        spent: oldPlayer.spent + spell.cost,
      })
    } else {
      player = Object.assign({}, oldPlayer);
    }

    player.history = player.history.map(spell => {
      if (typeof spell.active === 'undefined') {
        spell.active = spell.duration
      }
      return spell
    });

    let round = player.history.reduce(turn, { damage: 0, armor: 0, hp: 0, mana: 0 })

    let boss = Object.assign({}, oldBoss, {
      hp: oldBoss.hp - round.damage
    })

    player = Object.assign({}, player, {
      hp: player.hp + round.hp,
      mana: player.mana + round.mana,
    })

    player.history = player.history.map(spell => {
      return Object.assign({}, spell, {
        active: Math.max(spell.active - 1, 0)
      })
    })

    round = player.history.reduce(turn, { damage: 0, armor: 0, hp: 0, mana: 0 })

    boss = Object.assign({}, boss, {
      hp: boss.hp - round.damage
    })

    player = Object.assign({}, player, {
      mana: player.mana + round.mana,
    })

    if (boss.hp > 0) {
      player = Object.assign({}, player, {
        hp: player.hp - Math.max(boss.damage - round.armor, 1)
      })
    }

    player.history = player.history.map(spell => {
      return Object.assign({}, spell, {
        active: Math.max(spell.active - 1, 0)
      })
    })

    if (boss.hp > 0 && player.hp > 0 && depth < 18 && player.spent < 1000) simulate(player, boss, depth + 1)
    if (player.hp > 0 && boss.hp < 1) {
      min = Math.min(player.spent, min)
      console.log(player.history.map(s => s.name[0]), player.hp, boss.hp, player.spent, depth)
    }
  }
}

simulate()

console.log(min)
