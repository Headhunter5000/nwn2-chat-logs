import { createElement } from 'react';
import type { IconType } from 'react-icons';
import * as Lu from 'react-icons/lu';

const create = (icon: IconType) => () => createElement(icon);

export const Search = create(Lu.LuSearch);
export const AssistListening = create(Lu.LuVolume2);
export const Previous = create(Lu.LuChevronLeft);
export const Next = create(Lu.LuChevronRight);
export const FormPrevious = create(Lu.LuChevronLeft);
export const FormNext = create(Lu.LuChevronRight);
export const FormDown = create(Lu.LuChevronDown);
export const FormUp = create(Lu.LuChevronUp);
export const Close = create(Lu.LuX);
export const FormClose = create(Lu.LuX);

export const Actions = create(Lu.LuMoveHorizontal);
export const ClosedCaption = create(Lu.LuTv);
export const Expand = create(Lu.LuMaximize2);
export const Pause = create(Lu.LuPause);
export const Blank = () => null;

export const Alert = create(Lu.LuTriangleAlert);
export const Ascending = create(Lu.LuTrendingUp);
export const Checkmark = create(Lu.LuSquareCheck);
export const ChevronDown = create(Lu.LuChevronDown);
export const ChevronLeft = create(Lu.LuChevronLeft);
export const ChevronRight = create(Lu.LuChevronRight);
export const ChevronUp = create(Lu.LuChevronUp);
export const Configure = create(Lu.LuSettings);
export const Descending = create(Lu.LuTrendingDown);
export const Down = create(Lu.LuChevronDown);
export const FormCalendar = create(Lu.LuTimer);
export const FormCheckmark = create(Lu.LuSquareCheck);
export const FormFolder = create(Lu.LuList);
export const FormSearch = create(Lu.LuSearch);
export const Menu = create(Lu.LuMenu);
export const Play = create(Lu.LuPlay);
export const StatusCritical = create(Lu.LuOctagonAlert);
export const StatusGood = create(Lu.LuSquareCheckBig);
export const StatusUnknown = create(Lu.LuSmile);
export const StatusWarning = create(Lu.LuTriangleAlert);
export const Up = create(Lu.LuChevronUp);

export const CircleInformation = create(Lu.LuSmile);
export const Calendar = create(Lu.LuTimer);

export const FormPin = create(Lu.LuPin);
export const StatusCriticalSmall = create(Lu.LuOctagonAlert);
export const StatusGoodSmall = create(Lu.LuSquareCheckBig);
export const StatusWarningSmall = create(Lu.LuTriangleAlert);
export const StatusUnknownSmall = create(Lu.LuSmile);

export const Subtract = create(Lu.LuMinus);
export const Volume = create(Lu.LuVolume);
export const VolumeLow = create(Lu.LuVolume1);
export const Filter = create(Lu.LuSearch);
export const Descend = create(Lu.LuTrendingDown);
export const Ascend = create(Lu.LuTrendingUp);

export const Splits = create(Lu.LuSplit);
export const Lock = create(Lu.LuLock);
export const CircleAlert = create(Lu.LuTriangleAlert);
export const Star = create(Lu.LuStar);
export const StarOutline = create(Lu.LuStar);

export const Like = create(Lu.LuThumbsUp);
export const LikeFill = create(Lu.LuThumbsUp);
export const Dislike = create(Lu.LuThumbsDown);
export const DislikeFill = create(Lu.LuThumbsDown);
export const Copy = create(Lu.LuSearch);

export const Add = create(Lu.LuPlus);

export const base = {};