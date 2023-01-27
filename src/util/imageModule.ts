import rabbitCursor from '../img/cursor/cursor_rabbit.png'
import rabbitCursorClicked from '../img/cursor/cursor_rabbit_clicked.png'
import homeIcon from '../img/homemenu.png'
import menuIcon from '../img/mouse.png'
import handCursor from '../img/cursor/rightHand.png'
import pointerCursor from '../img/cursor/pointerCursor.png'
import keyboardIntro from '../img/introKeyboard.png'
import hKey from '../img/hkey.png'
import aKey from '../img/akey.png'
import yKey from '../img/ykey.png'
import oKey from '../img/okey.png'
import nKey from '../img/nkey.png'
import gKey from '../img/gkey.png'
import cat from '../img/cat.png'
import cat2 from '../img/cat2.png'
import cat3 from '../img/cat3.png'
import cat4 from '../img/cat4.png'
import notFound from '../img/404.png'
import backSpace from '../img/backspace.png'
import backSpaceActive from '../img/backspace_active.png'
import intp from '../img/intp.png'
import git from '../img/git.png'
import velog from '../img/velog.png'

const cursors = { rabbitCursor, rabbitCursorClicked, handCursor, pointerCursor }
const icons = { homeIcon, menuIcon, git, velog }
const images = { keyboardIntro, notFound, backSpace, backSpaceActive, intp }
const flyingKeycaps = [ hKey, aKey, yKey, oKey, nKey, gKey ]
const imageModule = { cursors, icons, images, flyingKeycaps }
const cats = { cat, cat2, cat3, cat4 }

export { flyingKeycaps };
export { cats };
export { cursors };
export { icons };
export { images };

export default imageModule;