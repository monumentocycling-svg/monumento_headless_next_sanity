export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {name:'priority', title:'Priority (lower = first)', type:'number', initialValue: 10},
    {name:'title', title:'Title', type:'string', validation:(Rule:any)=>Rule.required()},
    {name:'summary', title:'Summary', type:'text', rows:3},
    {name:'details', title:'Details', type:'text', rows:6},
    {name:'durationMinutes', title:'Duration (minutes)', type:'number'},
    {name:'priceFrom', title:'Price (from)', type:'string', description:'Ej: "Desde $80.000" o "Cotizar"'},
  ]
}
