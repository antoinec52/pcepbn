/**
 * return a formatted json from the original input of the balance
 *
 * @param data
 * @param callback
 */
function weight (data, callback)
{
    const value = data.split('');

    let sign = value[6],
        val = makeString(value, 8, 15),
        unit = makeString(value, 16, 18);

    callback({
        poids: sign + val + ' ' + unit,
        sign: sign,
        value: val,
        unit: unit
    });
}

/**
 * make a new string from a list of char
 *
 * @param list
 * @param start
 * @param end
 *
 * @return {string}
 */
function makeString (list, start, end)
{
    let string = '';

    for (let i = start; i <= end; i++) {
        if (list[i] !== ' ') string += list[i];
    }

    return string;
}

exports.weight = weight;