export async function get_template_map(lang) {
  var ret
  var url = 'https://' + lang + '.wikipedia.org/w/api.php'
  var params = {
    action: 'query',
    prop: 'revisions',
    titles: 'MediaWiki:Citoid-template-type-map.json',
    rvprop: 'content',
    rvslots: 'main',
    format: 'json'
  }
    
  url = url + '?origin=*'
  Object.keys(params).forEach(function(key){
    url += "&" + key + "=" + params[key]
  })
    
  var response = await fetch(url)
  var json = await response.json()
  var pages =  json.query.pages

  for (var p in pages) {
    ret = pages[p].revisions[0].slots.main['*'];
  }
  
  return JSON.parse(ret)
}


export async function get_template_keys(lang, template_name) {
  var ret
  var url = 'https://' + lang + '.wikipedia.org/w/api.php'
  var params = {
    action: 'templatedata',
    titles: template_name,
    lang: 'en',
    formatversion: '2',
    format: 'json'
  }
    
  url = url + '?origin=*'
  Object.keys(params).forEach(function(key){
    url += "&" + key + "=" + params[key]
  })
  
  var response = await fetch(url)
  var json = await response.json()
  var pages = json.pages

  for (var p in pages) {
    ret = Object.keys(pages[p].maps.citoid);
  }

  return ret
}

export async function get_citation(cite) {
  var url = 'https://en.wikipedia.org/api/rest_v1/data/citation/mediawiki/'
  url = url + encodeURIComponent(cite)
  var response = await fetch(url)
  var json = await response.json()
  return json
}
