export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {name:'title', title:'Site title', type:'string', initialValue:'Monumento Cycling'},
    {name:'tagline', title:'Tagline', type:'string', initialValue:'Nicho premium • Atención personalizada'},
    {name:'city', title:'City', type:'string', initialValue:'Medellín, Colombia'},
    {name:'instagramUrl', title:'Instagram URL', type:'url'},
    {name:'whatsappUrl', title:'WhatsApp URL', type:'url', description:'Formato: https://wa.me/57TU_NUMERO'},
    {name:'email', title:'Email', type:'string', initialValue:'info@monumento.cc'},
    {name:'bookingEmbedUrl', title:'Booking embed URL', type:'url', description:'URL para iframe (Calendly/Cal).'},
  ]
}
