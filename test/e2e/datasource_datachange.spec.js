import { selectCell, mouseDown } from '../helpers/common';

require('jasmine-ajax')

describe('datasource_datachange', () => {

  var id = 'testContainer';
  var url = 'http://example.com/dummy';
  var request;

  beforeEach(function(done) {
    if(!this.$container) {
      this.$container = $(`<div id="${id}"></div>`).appendTo('body');
    }
    jasmine.Ajax.install();
    jasmine.Ajax.stubRequest(url + '/settings' ).andReturn({
      response: JSON.stringify({data:{
        rowHeaders: true,
        colHeaders: true,
        columnSorting: true,
        contextMenu: true,
        manualColumnMove: true,
        manualRowMove: true,
        sortIndicator: true,
        filters: true,
        dropdownMenu: true,
        afterUpdateSettings: function(data){ console.log('settings', data) }
      }})
    });
    jasmine.Ajax.stubRequest(url + '/update','','POST').andReturn({response:JSON.stringify({data:'ok'}) })
    jasmine.Ajax.stubRequest(url + '/create/column','','POST').andReturn({response:JSON.stringify({name:'dynamic_1'}) })
    jasmine.Ajax.stubRequest(url + '/create/row','','POST').andReturn({response:JSON.stringify({data:{ id: 10,
      first_name: '',
      last_name: '',
      age: '',
      sex: '',
      phone: '' }, 'id':'id'}) })
    jasmine.Ajax.stubRequest(url + '/data','','POST').andReturn({
      status: 200,
      contentType: 'application/json',
      response: JSON.stringify({rowId:'id', data:[{ id: 1,
        first_name: 'John',
        last_name: 'Smith',
        age: 10,
        sex: 'male',
        phone: '+435564656' },
      { id: 2,
        first_name: 'Kasia',
        last_name: 'Sandwich',
        age: 18,
        sex: 'female',
        phone: '+4325324' },
      { id: 3,
        first_name: 'Jane',
        last_name: 'Walker',
        age: 60,
        sex: 'female',
        phone: '+43553456' },
      { id: 4,
        first_name: 'Rafal',
        last_name: 'Ek',
        age: 34,
        sex: 'male',
        phone: '+4354324234' },
      { id: 5,
        first_name: 'Kam',
        last_name: 'Dobrz',
        age: 20,
        sex: 'male',
        phone: '+435223122' }]
      })
    });
    done();
  });

  afterEach(function() {
    if (this.$container) {
      jasmine.Ajax.uninstall();
      destroy();
      this.$container.remove();
    }
  });

  it('should call /settings ajax call on init', (done) => {  
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if(req.request.url === url + '/settings') {
            request = jasmine.Ajax.requests.at(0);
            expect(request.method).toBe('GET');
            expect(request.url).toBe(url + '/settings');
            setTimeout(() => {done();}, 50);
          }
        }
      },
    });
  });

  it('should call /data ajax call on init', (done) => {  
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if(req.request.url === url + '/data') {
            request = jasmine.Ajax.requests.at(1);
            expect(request.method).toBe('POST');
            expect(request.url).toBe(url + '/data');
            setTimeout(() => {done();}, 50);
          }
        }
      },
    });
  });

  it('should call /create/row ajax call after create row', (done) => {  
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if(req.request.url === url + '/create/row') {
            request = jasmine.Ajax.requests.filter(url + '/create/row')[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(url + '/create/row');
            selectCell(3,0);
            expect(getValue()).toBe(10);
            setTimeout(() => {done();}, 50);
          } else {
            jasmine.Ajax.requests.reset();
          }

        }
      },
    });
    setTimeout( () =>{
      selectCell(2, 2);
      contextMenu();
      $('.htContextMenu .ht_master .htCore')
        .find('tbody td')
        .not('.htSeparator')
        .eq(1)
        .simulate('mousedown');

    }, 100);
  });

  it('should call /create/column ajax call after create col', (done) => {  
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if(req.request.url === url + '/create/column') {
            request = jasmine.Ajax.requests.filter(url + '/create/column')[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(url + '/create/column');
            setTimeout(() => {done();}, 50);
          } else {
            jasmine.Ajax.requests.reset();
          }

        }
      },
    });
    setTimeout( () => {
      selectCell(2, 2);
      contextMenu();
      $('.htContextMenu .ht_master .htCore')
        .find('tbody td')
        .not('.htSeparator')
        .eq(3)
        .simulate('mousedown');

    }, 100);
  });

  it('should call /update ajax call on change', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if(req.request.url === url + '/data') {
            setDataAtCell(1, 2, 'test');
            request = jasmine.Ajax.requests.mostRecent();
            var data = JSON.parse(request.params);
            expect(request.method).toBe('POST');
            expect(request.url).toBe(url + '/update');
            expect(data.changes[0].column).toBe('last_name');
            expect(data.changes[0].newValue).toBe('test');
            expect(data.changes[0].oldValue).toBe('Sandwich');
            expect(data.changes[0].row).toBe(2);
            setTimeout(() => {done();}, 50);      
          }
        }
      },
    });
  });
});
