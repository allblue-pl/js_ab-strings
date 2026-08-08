
export class abStrings_Class {
    escapeFromUnallowedChars(str        , unallowedCharacters        )         {
        let regexp = new RegExp(`[${unallowedCharacters}]`, 'g');

        return str.replace(regexp, '');
    }

    escapeHtml(html        )         {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    escapeLangChars(str        )         {
        let replaceFrom = [ 'ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż',
                'Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż' ];
        let replaceTo = [ 'a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z',
                'A', 'C', 'E', 'L', 'N', 'O', 'S', 'Z', 'Z' ];
    
        let regexp = new RegExp(replaceFrom.join('|'), 'g');
    
        return str.replace(regexp, (match) => {
            return replaceTo[replaceFrom.indexOf(match)];
        });
    }
    
    escapeToAllowedChars(str        , allowedCharacters        )         {
        let regexp = new RegExp(`[^${allowedCharacters}]`, 'g');

        return str.replace(regexp, '');
    }

    escapeRegExpChars(str        )         {
        return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    getCharsRegExp(types                = [], extra         = '', 
            langs                     = null)         {
        for (let type of types) {
            if (!types.includes(type))
                throw new Error(`Unknown chars type '${type}'.`);
        }

        let chars = '';

        if (types.includes('digits'))
            chars += '0-9';
        if (types.includes('letters'))
            chars += 'a-zA-Z' + this.getLangsSpecialCharacters();
        if (types.includes('special')) {
            chars += ' `!@#%&_=/<>:;",\'' +
                '\\\\' + '\\^' + '\\$' + '\\.' + '\\[' + '\\]' + '\\|' +
                '\\(' + '\\)' + '\\?' + '\\*' + '\\+' + '\\{' + '\\}' +
                '\\-';
        }

        return chars + this.escapeRegExpChars(extra);
    }

    getCharsRegExp_Basic(extra         = '')         {
        return this.getCharsRegExp([ 'digits', 'letters', 'special' ], extra);
    }

    getLangsSpecialCharacters(langs                     = null)         {
        if (langs === null)
            langs = [ 'pl' ];

        let chars = '';
        if (langs.includes('pl'))
            chars += 'ąćęłńóśźż' + 'ĄĆĘŁŃÓŚŹŻ';

        return chars;
    }

    pad(str        , pad        , size        )         {
        str = str + ``;
        while (str.length < size) 
            str = pad + str;
        return str.substring(0, size);
    }
    
    removeDoubles(str        , char        )         {
        let regexp = new RegExp(`${char}${char}`, 'g');
        while (str.match(regexp))
            str = str.replace(regexp, char);

        return str;
    }

}
const abStrings = new abStrings_Class();
export default abStrings;