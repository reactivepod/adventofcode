'use strict'

const weapons = [
  { cost:  8, damage: 4, armor: 0, name: 'Dagger' },
  { cost: 10, damage: 5, armor: 0, name: 'Shortsword' },
  { cost: 25, damage: 6, armor: 0, name: 'Warhammer' },
  { cost: 40, damage: 7, armor: 0, name: 'Longsword' },
  { cost: 74, damage: 8, armor: 0, name: 'Greataxe' },
]


const armor = [
  { cost:   0, damage: 0, armor: 0, name: 'Nothing' },
  { cost:  13, damage: 0, armor: 1, name: 'Leather' },
  { cost:  31, damage: 0, armor: 2, name: 'Chainmail' },
  { cost:  53, damage: 0, armor: 3, name: 'Splintnmail' },
  { cost:  75, damage: 0, armor: 4, name: 'Bandedmail' },
  { cost: 102, damage: 0, armor: 5, name: 'Platemail' },
]

const rings = [
  { cost:   0, damage: 0, armor: 0, name: 'Damage +0' },
  { cost:  25, damage: 1, armor: 0, name: 'Damage +1' },
  { cost:  25, damage: 1, armor: 0, name: 'Damage +1' },
  { cost:  50, damage: 2, armor: 0, name: 'Damage +2' },
  { cost: 100, damage: 3, armor: 0, name: 'Damage +3' },
  { cost:   0, damage: 0, armor: 0, name: 'Defense +0' },
  { cost:  20, damage: 0, armor: 1, name: 'Defense +1' },
  { cost:  40, damage: 0, armor: 2, name: 'Defense +2' },
  { cost:  80, damage: 0, armor: 3, name: 'Defense +3' },
]


const simulate = (player) => {
  const boss = { hp: 104, armor: 1, damage: 8 }

  while (boss.hp > 0 && player.hp > 0) {
    const playerDamage = Math.max(player.damage - boss.armor, 1)
    const bossDamage = Math.max(boss.damage - player.armor, 1)
    if (player.hp > 0) boss.hp = boss.hp - playerDamage
    if (boss.hp > 0) player.hp = player.hp - bossDamage
  }

  return player.hp > 0
}

let min = 1000
let max = 0

for (let weapon of weapons) {
for (let mail of armor) {
for (let ring1 of rings) {
  const otherRings = rings.filter(ring => ring.name !== ring1.name)
  for (let ring2 of otherRings) {

    const player = {
      hp: 100,
      equipment: [weapon, mail, ring1, ring2],
      get cost() {
        return this.equipment.reduce((a, b) => a + b.cost, 0)
      },
      get armor() {
        return this.equipment.reduce((a, b) => a + b.armor, 0)
      },
      get damage() {
        return this.equipment.reduce((a, b) => a + b.damage, 0)
      },
    }

    if (simulate(player)) {
      if (player.cost < min) {
        min = player.cost
      }
    } else {
      if (player.cost > max) {
        max = player.cost
      }
    }

  }
}
}
}

console.log(min, max)
