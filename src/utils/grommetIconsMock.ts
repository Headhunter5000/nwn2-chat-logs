import {
  ChevronDown as LuChevronDown,
  ChevronLeft as LuChevronLeft,
  ChevronRight as LuChevronRight,
  ChevronUp as LuChevronUp,
  Minus as LuMinus,
  Plus as LuPlus,
  Search as LuSearch,
  Settings as LuSettings,
  Split as LuSplit,
  Timer as LuTimer,
  X as LuX,
  type LucideIcon,
} from 'lucide-react';
import { createElement } from 'react';

type IconSize = 'small' | 'medium' | 'large' | number;

const ICON_SIZES = {
  small: 24,
  medium: 32,
  large: 48,
} as const;

const create = (icon: LucideIcon) => ({ size }: { size: IconSize }) => {
  const sizeValue =
  //typeof size === 'number' ? size :
      typeof size === 'string' && size in ICON_SIZES
        ? ICON_SIZES[size]
        : ICON_SIZES.small;
  console.log({ size, sizeValue });
  return createElement(icon, { size: sizeValue });
};

// Ein Eintrag pro tatsächlich benötigtem Icon.
// Mehrfach verwendete Icons (z.B. mehrere Chevrons, TriangleAlert etc.)
// tauchen hier nur EINMAL auf.
const icons = {
  chevronDown: create(LuChevronDown),
  chevronLeft: create(LuChevronLeft),
  chevronRight: create(LuChevronRight),
  chevronUp: create(LuChevronUp),
  //list: create(LuList),
  //lock: create(LuLock),
  //maximize2: create(LuMaximize2),
  //menu: create(LuMenu),
  minus: create(LuMinus),
  //moveHorizontal: create(LuMoveHorizontal),
  //octagonAlert: create(LuOctagonAlert),
  //pause: create(LuPause),
  //pin: create(LuPin),
  //play: create(LuPlay),
  plus: create(LuPlus),
  search: create(LuSearch),
  settings: create(LuSettings),
  //smile: create(LuSmile),
  split: create(LuSplit),
  //squareCheck: create(LuSquareCheck),
  //squareCheckBig: create(LuSquareCheckBig),
  //star: create(LuStar),
  //thumbsDown: create(LuThumbsDown),
  //thumbsUp: create(LuThumbsUp),
  timer: create(LuTimer),
  //trendingDown: create(LuTrendingDown),
  //trendingUp: create(LuTrendingUp),
  //triangleAlert: create(LuTriangleAlert),
  //tv: create(LuTv),
  //volume: create(LuVolume),
  //volume1: create(LuVolume1),
  //volume2: create(LuVolume2),
  x: create(LuX),
} as const;

export const Blank = () => null;

// Alle öffentlichen Exports sind reine Aliase auf obige Icons.
// Identische Icons zeigen dadurch garantiert auf dieselbe Komponente.
export const Search = icons.search;
export const AssistListening = Blank; //icons.volume2;
export const Previous = icons.chevronLeft;
export const Next = icons.chevronRight;
export const FormPrevious = icons.chevronLeft;
export const FormNext = icons.chevronRight;
export const FormDown = icons.chevronDown;
export const FormUp = icons.chevronUp;
export const Close = icons.x;
export const FormClose = icons.x;

export const Actions = Blank; //icons.moveHorizontal;
export const ClosedCaption = Blank; //icons.tv;
export const Expand = Blank; //icons.maximize2;
export const Pause = Blank; //icons.pause;

export const Alert = Blank; //icons.triangleAlert;
export const Ascending = Blank; //icons.trendingUp;
export const Checkmark = Blank; //icons.squareCheck;
export const ChevronDown = icons.chevronDown;
export const ChevronLeft = icons.chevronLeft;
export const ChevronRight = icons.chevronRight;
export const ChevronUp = icons.chevronUp;
export const Configure = icons.settings;
export const Descending = Blank; //icons.trendingDown;
export const Down = icons.chevronDown;
export const FormCalendar = icons.timer;
export const FormCheckmark = Blank; //icons.squareCheck;
export const FormFolder = Blank; //icons.list;
export const FormSearch = icons.search;
export const Menu = Blank; //icons.menu;
export const Play = Blank; //icons.play;
export const StatusCritical = Blank; //icons.octagonAlert;
export const StatusGood = Blank; //icons.squareCheckBig;
export const StatusUnknown = Blank; //icons.smile;
export const StatusWarning = Blank; //icons.triangleAlert;
export const Up = icons.chevronUp;

export const CircleInformation = Blank; //icons.smile;
export const Calendar = icons.timer;

export const FormPin = Blank; //icons.pin;
export const StatusCriticalSmall = Blank; //icons.octagonAlert;
export const StatusGoodSmall = Blank; //icons.squareCheckBig;
export const StatusWarningSmall = Blank; //icons.triangleAlert;
export const StatusUnknownSmall = Blank; //icons.smile;

export const Subtract = Blank; //icons.minus;
export const Volume = Blank; //icons.volume;
export const VolumeLow = Blank; //icons.volume1;
export const Filter = Blank; //icons.search;
export const Descend = Blank; //icons.trendingDown;
export const Ascend = Blank; //icons.trendingUp;

export const Splits = Blank; //icons.split;
export const Lock = Blank; //icons.lock;
export const CircleAlert = Blank; //icons.triangleAlert;
export const Star = Blank; //icons.star;
export const StarOutline = Blank; //icons.star;

export const Like = Blank; //icons.thumbsUp;
export const LikeFill = Blank; //icons.thumbsUp;
export const Dislike = Blank; //icons.thumbsDown;
export const DislikeFill = Blank; //icons.thumbsDown;
export const Copy = Blank; //icons.search;

export const Add = icons.plus;

export const base = {};