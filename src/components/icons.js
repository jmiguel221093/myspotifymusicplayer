import React from 'react';
const Icon = ({
    children
}) => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="icon">
            {children}
        </svg>
)

const PlayIcon = () => (
    <Icon>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </Icon>
)

const ShuffleIcon = () => (
    <Icon>
        <polyline points="16 3 21 3 21 8"></polyline>
        <line x1="4" y1="20" x2="21" y2="3"></line>
        <polyline points="21 16 21 21 16 21"></polyline>
        <line x1="15" y1="15" x2="21" y2="21"></line>
        <line x1="4" y1="4" x2="9" y2="9"></line>
    </Icon>
)

const SkipBackIcon = () => (
    <Icon>
        <polygon points="19 20 9 12 19 4 19 20"></polygon>
        <line x1="5" y1="19" x2="5" y2="5"></line>
    </Icon>
)

const SkipForwardIcon = () => (
    <Icon>
        <polygon points="5 4 15 12 5 20 5 4"></polygon>
        <line x1="19" y1="5" x2="19" y2="19"></line>
    </Icon>
)

const RefreshCWIcon = () => (
    <Icon>
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </Icon>
)

const PauseIcon = () => (
    <Icon>
        <path d="M10059.28,0V18" transform="translate(-10052.28 2)" />
        <path d="M10059.28,0V18" transform="translate(-10042.28 2)" />
    </Icon>
)

const LeftArrowIcon = () => (
    <Icon>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </Icon>
)

const ListIcon = () => (
    <Icon>
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3" y2="6"></line>
        <line x1="3" y1="12" x2="3" y2="12"></line>
        <line x1="3" y1="18" x2="3" y2="18"></line>
    </Icon>
)

const Volume2Icon = () => (
    <Icon>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </Icon>
)

const Volume1Icon = () => (
    <Icon>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </Icon>
)

const VolumeXIcon = () => (
    <Icon>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
    </Icon>
)

const VolumeIcon = () => (
    <Icon>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    </Icon>
)

const Minimize2Icon = () => (
    <Icon>
        <polyline points="4 14 10 14 10 20"></polyline>
        <polyline points="20 10 14 10 14 4"></polyline>
        <line x1="14" y1="10" x2="21" y2="3"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
    </Icon>
);

const SearchIcon = () => (
    <Icon>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </Icon>
);

const MoreHorizontalIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </Icon>
);

const PlusIcon = () => (
    <Icon>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </Icon>
)

const XIcon = () => (
    <Icon>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </Icon>
)

const DiscIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
    </Icon>
)

const UserIcon = () => (
    <Icon>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </Icon>
)

export {
    Icon,
    PlayIcon,
    ShuffleIcon,
    SkipBackIcon,
    SkipForwardIcon,
    RefreshCWIcon,
    PauseIcon,
    LeftArrowIcon,
    ListIcon,
    Volume2Icon,
    Volume1Icon,
    VolumeXIcon,
    VolumeIcon,
    Minimize2Icon,
    SearchIcon,
    MoreHorizontalIcon,
    PlusIcon,
    XIcon,
    DiscIcon,
    UserIcon
}