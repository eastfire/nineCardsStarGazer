import sunImg from "../assets/images/sun.png"
import moonImg from "../assets/images/moon.png"
import starImg from "../assets/images/star.png"
import earthImg from "../assets/images/earth.png"
import saturnImg from "../assets/images/saturn.png"
import galaxyImg from "../assets/images/galaxy.png"

export const IMAGE_MAP = {
  sun: sunImg,
  moon: moonImg,
  star: starImg,
  earth: earthImg,
  saturn: saturnImg,
  galaxy: galaxyImg,
}

export const SYMBOL_MAP = {
  sun: '🌞',
  moon: '🌜',
  star: '⭐',
  earth: '🌍',
  saturn: '🪐',
  galaxy: '🌌',
}

export const RULE_CHECK_MAP = {
  sun: (askingPlayer, players, playerHands, symbol) => {
    if (playerHands[askingPlayer].left === 'sun') {
      return { adjust: 1, reason: `提问者有${SYMBOL_MAP['sun']}` };
    }
    return undefined
  },
  moon: (askingPlayer, players, playerHands, symbol) => {
    const moonCount = [
      playerHands[1].left, playerHands[1].right,
      playerHands[players.length - 1].left, playerHands[players.length - 1].right
    ].filter(s => s === 'moon').length
    if (moonCount === 1) {
      return { adjust: 1, reason: `我的左边玩家和右边玩家有且仅有1个${SYMBOL_MAP['moon']}` };
    }
    return undefined
  },
  star: (askingPlayer, players, playerHands, symbol) => {
    let starCount = 0
    for (let i = 0; i < players.length; i++) {
      if (playerHands[i].left === 'star') {
        starCount++;
      }
      if (playerHands[i].right === 'star') {
        starCount++;
      }
    }
    if (starCount > 0) {
      return { adjust: starCount, reason: `看到了${starCount}个${SYMBOL_MAP['star']}` };
    }
    return undefined
  },
  earth: (askingPlayer, players, playerHands, symbol) => {
    if (playerHands[0].left === 'earth' || playerHands[0].right === 'earth') {
      return { adjust: 0, lie: -1, reason: `我有${SYMBOL_MAP['earth']},可以将数字-1` };
    }
    return undefined
  },
  saturn: (askingPlayer, players, playerHands, symbol) => {
    let adjust = 0
    let reason = '';
    for (let i = 0; i < players.length; i++) {
      if (playerHands[i].left === 'saturn' && playerHands[i].right === symbol ||
        playerHands[i].right === 'saturn' && playerHands[i].left === symbol) {
        adjust++;
        reason += `${players[i]}有${SYMBOL_MAP['saturn']}且另一张牌是${SYMBOL_MAP[symbol]}；`
      }
    }
    if (adjust > 0) {
      return { adjust: adjust, reason };
    }
    return undefined
  },
  galaxy: (askingPlayer, players, playerHands, symbol) => {
    let galaxyCount = 0
    for (let i = 0; i < players.length; i++) {
      if (playerHands[i].left === 'galaxy') {
        galaxyCount++;
      }
      if (playerHands[i].right === 'galaxy') {
        galaxyCount++;
      }
    }
    if (galaxyCount % 2 == 1) {
      return { adjust: galaxyCount, reason: `看到了${galaxyCount}个${SYMBOL_MAP['galaxy']}` };
    }
    return undefined
  },
}