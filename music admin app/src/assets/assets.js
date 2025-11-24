import { Folder, FolderPlus, List, Music } from 'lucide-react';
import logo from './musify.png';

export const assets = {
    logo
}

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Add Songs",
        icon: Music,
        path: "/add-songs"
    },
    {
        id: "02",
        label: "List Songs",
        icon: List,
        path: "/list-songs"
    },
    {
        id: "03",
        label: "Add Album",
        icon: FolderPlus,
        path: "/add-album"
    },
    {
        id: "04",
        label: "List Album",
        icon: Folder,
        path: "/list-albums"
    },

]