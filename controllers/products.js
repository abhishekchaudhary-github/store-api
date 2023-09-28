const Task = require('../models/product')
const get=(req,res)=>{
    res.send('hi')
}

const getStatic = async (req,res)=>{
    const {name,featured,company,sort,filter,page,numberfilter} = req.query
    const obj = {}
    if(company){
        obj.company = company
    }
    if(featured){
        obj.featured == 'true' ? obj.featured = true : obj.featured = false
    }
    if(name){
        obj.name = {$regex : name, $options : 'i' }
    }
    let findin = Task.find(obj)
    if(sort){
        let tem = sort.split(',').join(' ')
        findin.sort(tem)
    }
    if(filter){
        let tem = filter.split(',').join(' ')
        findin.select(tem)
    }
    if(page){
        findin.skip((Number(page)-1)*5).limit(5)
    }
    if(numberfilter){
        const opMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numberfilter.replace(
            regEx,
            (match) => `-${opMap[match]}-`
          );
        let ar = filters.split(',')
        findin.where('price')
        for(let i=0;i<ar.length;i++){
            // console.log(ar[i].split('-')[1])
            // console.log(ar[i].split('-')[2])
           switch(ar[i].split('-')[1]){
           case '$gt':findin.gt(Number(ar[i].split('-')[2]));break;
           case '$gte':findin.gte(Number(ar[i].split('-')[2]));break;
           case '$eq':findin.eq(Number(ar[i].split('-')[2]));break;
           case '$lt':findin.lt(Number(ar[i].split('-')[2]));break;
           case '$lte':findin.lte(Number(ar[i].split('-')[2]));break;
           }
        }
    }
    const resp = await findin
    res.status(200).json(resp);
}


module.exports = {get,getStatic}