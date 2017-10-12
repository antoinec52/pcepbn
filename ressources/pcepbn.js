$.ajax({
    method: 'GET',
    dataType: 'jsonp',
    jsonCallback: 'getWeight',
    url: 'http://192.168.200.87'
});

function getWeight (data)
{
    if (data['error'] !== '') {
        console.log('balance non connecté');
    } else {
        var weight = {
            poid: data['poids'],
            sign: data['sign'],
            value: data['value'],
            unit: data['unit']
        };

        console.log({
            poids: weight.poids,
            sign: weight.sign,
            value: weight.value,
            unit: weight.unit
        });
    }
}