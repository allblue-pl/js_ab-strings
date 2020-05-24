'use strict';

class abStrings_Class
{

    escapeLangChars(string) {
        let replaceFrom = [ 'ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż',
                'Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż' ];
        let replaceTo = [ 'a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z',
                'A', 'C', 'E', 'L', 'N', 'O', 'S', 'Z', 'Z' ];
    
        let regexp = new RegExp(replaceFrom.join('|'), 'g');
    
        return string.replace(regexp, (match) => {
            return replaceTo[replaceFrom.indexOf(match)];
        });
    }
    
    escapeToAllowedChars(string, allowedCharacters) {
        let regexp = new RegExp(`[^${allowedCharacters}]`, 'g');

        return string.replace(regexp, '');
    }

    escapeRegExpChars(string)
    {
        return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    pad(str, pad, size)
    {
        str = str + ``;
        while (str.length < size) 
            str = pad + str;
        return str.substr(0, 2);
    }
    
    removeDoubles(string, char) {
        let regexp = new RegExp(`${char}${char}`, 'g');
        while (string.match(regexp))
            string = string.replace(regexp, char);

        return string;
    }

}
module.exports = new abStrings_Class();