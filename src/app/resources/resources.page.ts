import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  cards: any [] = [
    {title: "Hispanic/ Latino: Hola", links: [
      {href: "https://www.facebook.com/HISLA.UMSL.1", content: "Hispanic Latino Associations"}, 
      {href: "http://www.hccstl.com/homepage.aspx", content: "Hispanic Chamber of Commerce of Metropolitan St. Louis"},
      {href: "http://www.brazildining.com/", content: "Yemanja Brasil Restaurant"},
      {href: "http://www.tucanos.com/", content: "Tucano's Brazilian Grill"},
      {href: "http://www.sambabom.com/", content: "Brasil: Samba Bom"},
      {href: "http://www.vivabrasilstl.org/", content: "Viva Brasil St. Louis"},
      {href: "http://casadesaludstl.org/", content: "Casa de Salud"},
      {href: "http://archstl.org/hispanicministry", content: "Archdiocese of St. Louis, Office of Hispanic Ministry"}
    ]},
    {title: "Indian: नमस्ते", links: [
      {href: "http://www.iastlouis.org/", content: "India Association of St. Louis"},
      {href: "http://www.oca-stl.org/", content: "OCA St. Louis Chapter - Asian Pacific American Advocates"},
      {href: "http://aaccstl.org/", content: "Asian American Chamber of Commerce"},
      {href: "https://www.linkedin.com/groups/South-Asian-Bar-Association-St-5181346?home=&amp;trk=anet_ug_hm&amp;goback=.gmr_5181346&amp;gid=5181346", content: "South Asian Bar Association of St. Louis"},
      {href: "http://www.dhildhil.com/index.php/en/", content: "DhilDhil - St. Louis Indian Classifieds"},
      {href: "http://www.gsstl.net/", content: "Gujarati Samaj of St. Louis"},
      {href: "http://www.yelp.com/search?find_desc=indian+food&amp;find_loc=Saint+Louis%2C+MO&amp;ns=1", content: "Indian restaurants"},
      {href: "http://www.yelp.com/search?find_desc=indian+food&amp;find_loc=Saint+Louis%2C+MO&amp;ns=1#find_desc=grocery+store", content: "Indian grocery stores"},
      {href: "http://www.motamilsangam.org", content: "Missouri Tamil Sangam"},
      {href: "http://www.namaskardesi.com", content: "Namaskardesi.com"},
      {href: "http://www.ohmkaram.org/", content: "Ohmkaram"},
      {href: "http://www.sangamastl.com/", content: "Sangama Kannada Sangha"},
      {href: "http://www.stlma.org/", content: "Malayalee Association of St. Louis"},
      {href: "http://www.stlmarathimandal.org/", content: "St. Louis Marathi Mandal"},
      {href: "http://www.stltelugu.org/", content: "Telugu Association of Saint Louis"},
      {href: "http://www.hindutemplestlouis.org/", content: "The Hindu Temple of St. Louis"}
    ]},
    {title: "Chinese: 你好", links: [
      {href: "http://www.oca-stl.org/", content: "OCA St. Louis Chapter - Asian Pacific American Advocates"},
      {href: "http://aaccstl.org/", content: "Asian American Chamber of Commerce"},  
      {href: "http://www.stlcls.org/", content: "St. Louis Chinese Language School"},
      {href: "http://www.slmcs.org/", content: "St. Louis Modern Chinese School"}
    ]},
    {title: "Vietnamese Communities: Xin chào", links: [
      {href: "http://www.oca-stl.org/", content: "OCA St. Louis Chapter - Asian Pacific American Advocates"},
      {href: "http://aaccstl.org/", content: "Asian American Chamber of Commerce"},
      {href: "http://vietnam.missouri.edu/", content: "The Vietnam Institute, University of Missouri"},
      {href: "https://tuoitre.vn/", content: "Tuoi Tre Online (Vietnamese Version)"},
      {href: "https://tuoitrenews.vn/", content: "Tuoi Tre Online (English  Version)"},
      {href: "http://dantri.com.vn/", content: "Dan Tri International (Vietnamese Version)"},
      {href: "http://www.dtinews.vn/", content: "Dan Tri International (English Version)"},
      {href: "http://www.igoviet.com/", content: "Midwest Viet Bao"}
    ]},
    {title: "Filipino Community: Kumusta", links: [
      {href: "https://www.faamo.net/", content: "Filipino American Association of Missouri"},
      {href: "http://www.filipinoexpress.com/", content: "The Filipino Express"}
    ]},
    {title: "German Community: Hallo", links: [
      {href: "https://www.germanschoolstl.org/", content: "German School Association of Greater St. Louis"},
      {href: "https://www.mrshea.com/germusa/gastl.htm", content: "German-Americans in Missouri and St. Louis"},
      {href: "http://www.germanstl.org/", content: "St. Louis German Cultural Society"},
      {href: "https://www.meetup.com/derstammtischstl/", content: "der Stammtisch – St. Louis"}
    ]},
    {title: "Israeli Community: שלום", links: [
      {href: "https://www.showmechabad.com/templates/articlecco_cdo/aid/999669/jewish/About-Us.htm", content: "Chabad of Greater St. Louis"},
      {href: "https://www.jfedstl.org/", content: "Jewish Federation of North America"},
      {href: "http://www.jccstl.com/", content: "St. Louis Jewish Community Center"},
      {href: "http://www.baisabe.com/", content: "Bais Abraham Congregation"},
      {href: "http://www.youngisrael-stl.org/", content: "Young Israel of St. Louis"},
      {href: "https://jewishinstlouis.org/welcome/", content: "CHAI St. Louis, a welcoming program from the Jewish Federation of St. Louis"},
      {href: "https://jewishinstlouis.org/", content: "Jewish in St. Louis"},
      {href: "https://jewishinstlouis.org/israel/", content: "Jewish in St. Louis - Israel"},
      {href: "https://www.globalfoodsmarket.com/", content: "Global Foods Market"},
      {href: "http://www.kohnskosher.com/", content: "Kohn’s Kosher Deli"},
      {href: "https://www.baisabe.com/shelanu.php", content: "Ivrit B'ivrit Sunday Morning Hebrew School"},
      {href: "http://www.kolrinahstl.org/", content: "Kol Rinah Congregation"}
    ]},
    {title: "Bosnian Community: Zdravo", links: [
      {href: "http://www.stlbosnians.com/", content: "St. Louis Bosnian"}
    ]},
    {title: "Russian Community: Здравствуйте", links: [
      {href: "http://www.russian-american.org/", content: "Russian American School"}
    ]},
    {title: "African Community: Habari", links: [
      {href: "http://www.ghanastl.com/", content: "Ghanaian Association of Greater St. Louis"},
      {href: "http://www.africandiasporacouncil.org/", content: "The African Diaspora Council"},
      {href: "http://connection33.com/", content: "Connection33"},
      {href: "http://vitendo4africa.org/", content: "Vitendo 4 Africa"},
    ]},
    {title: "Korean Community: 안녕하세요", links: [
      {href: "http://www.oca-stl.org/", content: "OCA St. Louis Chapter - Asian Pacific American Advocates"},
      {href: "http://aaccstl.org/", content: "Asian American Chamber of Commerce"},
      {href: "http://www.gateway-korea.org/", content: "Gateway Korea"},
      {href: "https://www.google.com/search?q=korean+restaurants+st.+louis&cad=h", content: "Korean restaurants"},
      {href: "http://www.yelp.com/search?find_desc=korean+grocery+stores&find_loc=Saint+Louis,+MO", content: "Korean grocery stores"},
      {href: "http://www.kpcstl.org/xe/", content: "Korean Presbyterian Church"},
      {href: "http://hopestl.org/", content: "Hope Community Church of St. Louis"}
    ]},
    {title: "Japanese Community: こんにちは", links: [
      {href: "http://aaccstl.org/", content: "Asian American Chamber of Commerce"},
      {href: "https://stlouisjacl.org/", content: "Japanese American Citizens League"},
      {href: "http://jasstl.org/", content: "Japan America Society of St. Louis"},
      {href: "https://sites.google.com/a/stlnihongo.org/stlnihongo/", content: "Japanese Language School"},
      {href: "http://www.jaswa-stlouis.org/", content: "Japan America Society - Women's Association"},
      {href: "http://www1.widgetserver.com/?subid4=1539460944.0148586467&kw=watch+TV&KW1=Widget%20Dedicated%20Servers&KW2=Chat%20Widget&KW3=Shopping%20Cart%20Widget&searchbox=0&domainname=0&backfill=0", content: "Japanese International Harvest Church"}
    ]},
  ]

  constructor() { }

  ngOnInit() {
  }

}
