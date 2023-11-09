import {Inter, Lusitana, DM_Serif_Display, Dela_Gothic_One, DM_Sans} from 'next/font/google';

export const inter = Inter({subsets: ['latin']});
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin']});
export const headerFont = DM_Serif_Display({
    weight: ['400'],
    style: ['italic'],    
    subsets: ['latin'],
});
export const dela_gothic_one = Dela_Gothic_One({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});
export const dm_sans = DM_Sans({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
})
