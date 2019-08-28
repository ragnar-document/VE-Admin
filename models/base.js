const knex = require('./knex');

class Base {
    constructor(props){
        this.table = props;
    }

    where(params) {
        return knex(this.table).where(params)
    }
    show(params) {
        return knex(this.table).where(params).select();
    }
    insert(params){
        return knex(this.table).insert( params )
    }
    single(id){
        return knex(this.table).where('id','=',id).select()
    }
    edit(id, params){
        return knex(this.table).where('id', '=', id).update( params )
    }
    all(){
        return knex(this.table).select();
    }
    classInsertTime(id, params) {
        return knex(this.table).where('class_id', '=', id).update(params)
    }

    softall(pageSize = 20, pageIndex = 1, params={}, dateFilter={}){
        let offset = (pageIndex - 1)*pageSize;
        if (dateFilter.column) {
            return knex(this.table)
            .where(params)
            .whereNull('isdeleted')
            .offset(offset)
            .limit(pageSize)
            .whereBetween(dateFilter.column,[`${dateFilter.startAt} 00:00`, `${dateFilter.endAt} 23:59`])
            .select()
        }else{
            return knex(this.table)
            .where(params)
            .whereNull('isdeleted')
            .offset(offset)
            .limit(pageSize)
            .select()
        }   
    }

    delete(id){
        return knex(this.table).where('id','=',id).update({ isdeleted: 1})
    }
    recover(id){
        return knex(this.table).where('id','=',id).update({ isdeleted: null})
    }
    count(params, dateFilter={}) {
        if(dateFilter.column) {
            return knex(this.table).where(params)
            .whereBetween(dateFilter.column,[`${dateFilter.startAt} 00:00`, `${dateFilter.endAt} 23:59`])
            .count('id as total');
        }else{
            return knex(this.table).where(params).count('id as total');
        }
    }
    pagination(pageSize = 20, pageIndex = 1, params={}, dateFilter={}){
        let offset = (pageIndex - 1)*pageSize;
        if (dateFilter.column) {
            return knex(this.table)
            .where(params)
            // .whereNull('isdeleted')
            .offset(offset)
            .limit(pageSize)
            .whereBetween(dateFilter.column,[`${dateFilter.startAt} 00:00`, `${dateFilter.endAt} 23:59`])
            .select()
        }else{
            return knex(this.table)
            .where(params)
            // .whereNull('isdeleted')
            .offset(offset)
            .limit(pageSize)
            .select()
        }
        
    }

}

module.exports = Base;