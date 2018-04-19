import { selectCell, mouseDown, resizeColumn, colWidth } from '../helpers/common';

require('jasmine-ajax');
var ZSchema = require('z-schema');

describe('datasource_datachange', () => {
  var id = 'testContainer';
  var url = 'http://example.com/dummy';
  var request;

  beforeEach(function(done) {
    if (!this.$container) {
      this.$container = $(`<div id="${id}"></div>`).appendTo('body');
    }
    jasmine.Ajax.install();
    jasmine.Ajax.stubRequest(`${url}/settings`).andReturn({
      response: JSON.stringify({data: {
        rowHeaders: true,
        colHeaders: true,
        columnSorting: true,
        contextMenu: true,
        manualColumnMove: true,
        manualColumnResize: true,
        manualRowResize: true,
        manualRowMove: true,
        sortIndicator: true,
        filters: true,
        dropdownMenu: true,
        mergeCells: true,
        manualColumnFreeze: true,
        readOnly: true,
        comments: true,
        hiddenColumns: true,
      }})
    });
    jasmine.Ajax.stubRequest(`${url}/row`, '', 'DELETE').andReturn({response: JSON.stringify({data: 'ok'}) });
    jasmine.Ajax.stubRequest(`${url}/column`, '', 'DELETE').andReturn({response: JSON.stringify({name: 'dynamic_1'}) });
    jasmine.Ajax.stubRequest(`${url}/update`, '', 'POST').andReturn({response: JSON.stringify({data: 'ok'}) });
    jasmine.Ajax.stubRequest(`${url}/column/move`, '', 'POST').andReturn({response: JSON.stringify({name: 'dynamic_1'}) });
    jasmine.Ajax.stubRequest(`${url}/column`, '', 'PUT').andReturn({response: JSON.stringify({name: 'dynamic_1'}) });
    jasmine.Ajax.stubRequest(`${url}/row`, '', 'PUT').andReturn({response: JSON.stringify({data: { id: 10,
      first_name: '',
      last_name: '',
      age: '',
      sex: '',
      phone: '' },
    id: 'id'}) });
    jasmine.Ajax.stubRequest(`${url}/data`, '', 'POST').andReturn({
      status: 200,
      contentType: 'application/json',
      response: JSON.stringify({rowId: 'id',
        data: [{ id: 1,
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
    jasmine.Ajax.stubRequest(`${url}/cell/merge`, '', 'POST').andReturn({response: JSON.stringify({data: 'ok'}) });
    jasmine.Ajax.stubRequest(`${url}/cell/unmerge`, '', 'POST').andReturn({response: JSON.stringify({data: 'ok'}) });
    jasmine.Ajax.stubRequest(`${url}/column/resize`, '', 'POST').andReturn({response: JSON.stringify({data: 'ok'}) });
    jasmine.Ajax.stubRequest(`${url}/row/resize`, '', 'POST').andReturn({response: JSON.stringify({data: 'ok'}) });
    jasmine.Ajax.stubRequest(`${url}/cell/meta`, '', 'POST').andReturn({response: JSON.stringify({data: 'ok'}) });
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
          if (req.request.url === `${url}/settings`) {
            request = jasmine.Ajax.requests.at(0);
            expect(request.method).toBe('GET');
            expect(request.url).toBe(`${url}/settings`);
            setTimeout(() => { done(); }, 50);
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
          if (req.request.url === `${url}/data`) {
            request = jasmine.Ajax.requests.at(1);
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/data`);
            setTimeout(() => { done(); }, 100);
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
          if (req.request.url === `${url}/row`) {
            request = jasmine.Ajax.requests.filter(`${url}/row`)[0];
            expect(request.method).toBe('PUT');
            expect(request.url).toBe(`${url}/row`);
            selectCell(3, 0);
            expect(getValue()).toBe(10);
            setTimeout(() => { done(); }, 50);
          } else {
            jasmine.Ajax.requests.reset();
          }
        }
      },
    });
    setTimeout(() => {
      selectCell(2, 2);
      contextMenu();
      $('.htContextMenu .ht_master .htCore')
        .find('tbody td')
        .not('.htSeparator')
        .eq(1)
        .simulate('mousedown');

    }, 100);
  });

  it('should call /data ajax call after filter', (done) => {
    var i = 0;
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        filters: true,
        dropdownMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/data`) {
            i++;
            if (i > 1) {
              request = jasmine.Ajax.requests.filter(`${url}/data`)[0];
              expect(request.method).toBe('POST');
              expect(request.url).toBe(`${url}/data`);
              setTimeout(() => { done(); }, 50);
            }
          }
        }
      },
    });
    setTimeout(() => {
      done();
      // jasmine.Ajax.requests.reset();

      // dropdownMenu(0);
      // $('.htDropdownMenu .ht_master .htCore').find('tbody :nth-child(9) td').simulate('mousedown');

      // setTimeout(() => {
      //   // Begins with 'c'
      //   document.activeElement.value = 'c';
      //   $(document.activeElement).simulate('keyup');
      //   $('.htDropdownMenu .ht_master .htCore').find('.htUIButton.htUIButtonOK input').simulate('click');
      // }, 50);
    }, 50);
  });

  it('should call /move/column ajax call after column move', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        colHeaders: true,
        manualColumnMove: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/column/move`) {
            request = jasmine.Ajax.requests.filter(`${url}/column/move`)[0];
            expect(request.method).toBe('POST');
            setTimeout(() => { done(); }, 50);
          } else {
            jasmine.Ajax.requests.reset();
          }

        }
      },
    });
    setTimeout(() => {
      var $container = $(`#${id}`);
      var $rowsHeaders = $container.find('.ht_clone_top tr th');

      $rowsHeaders.eq(2).simulate('mousedown');
      $rowsHeaders.eq(2).simulate('mouseup');
      $rowsHeaders.eq(2).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseover');
      $rowsHeaders.eq(1).simulate('mousemove');
      $rowsHeaders.eq(1).simulate('mouseup');
    }, 10);

    // }, 50);
  });

  it('should call PUT /column ajax call after create col', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/column`) {
            request = jasmine.Ajax.requests.filter(`${url}/column`)[0];
            expect(request.method).toBe('PUT');
            setTimeout(() => { done(); }, 50);
          } else {
            jasmine.Ajax.requests.reset();
          }

        }
      },
    });
    setTimeout(() => {
      selectCell(2, 2);
      contextMenu();
      $('.htContextMenu .ht_master .htCore')
        .find('tbody td')
        .not('.htSeparator')
        .eq(3)
        .simulate('mousedown');

    }, 10);
  });

  it('should call /update ajax call on change', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if (req.request.url === `${url}/data`) {
            setDataAtCell(1, 2, 'test');
            request = jasmine.Ajax.requests.mostRecent();
            var data = JSON.parse(request.params);
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/update`);
            expect(data.changes[0].column).toBe('last_name');
            expect(data.changes[0].newValue).toBe('test');
            expect(data.changes[0].oldValue).toBe('Sandwich');
            expect(data.changes[0].row).toBe(2);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
  });

  it('should call /cell/merge ajax call after merging cells and /cell/unmerge ajax after spliting merged cells', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        mergeCells: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/merge`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/merge`)[0];
            expect(request.method).toBe('POST');
            const plugin = hot.getPlugin('mergeCells');
            plugin.unmerge(0, 0, 2, 2);
          }
          if (req.request.url === `${url}/cell/unmerge`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/unmerge`)[0];
            expect(request.method).toBe('POST');
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      const plugin = hot.getPlugin('mergeCells');
      plugin.merge(0, 0, 2, 2);
    }, 100);
  });

  it('should call /column/resize ajax call after changing width of the column', (done) => {
    var validator = new ZSchema();
    var schema = {
      type: 'object',
      required: [
        'column',
        'size'
      ],
      properties: {
        column: {
          type: 'string'
        },
        size: {
          type: 'number'
        }
      }
    };
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/column/resize`) {
            request = jasmine.Ajax.requests.filter(`${url}/column/resize`)[0];
            console.log(request.body);
            expect(request.method).toBe('POST');
            expect(colWidth($('#testContainer'), 0)).toBe(200);
            var val = validator.validate(request.body, schema);
            val.should.be.true;
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      resizeColumn(1, 200);
    }, 50);
  });

  it('should call /row/resize ajax call after changing height of the row', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/row/resize`) {
            request = jasmine.Ajax.requests.filter(`${url}/row/resize`)[0];
            expect(request.method).toBe('POST');
            expect(rowHeight($('#testContainer'), 0)).toBe(61);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      resizeRow(0, 60);
    }, 50);
  });

  it('should call /cell/meta ajax call when aligning text', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      selectCell(2, 3);
      var contextSubMenu = $('.htContextMenuSub_' + item.text());
      var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(9);
      button.simulate('mousedown');
      deselectCell();
    }, 50);
  });

  it('should call /cell/meta ajax call while setting read-only property to the cell', (done) => {
    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        readOnly: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            expect(getCellMeta(0, 0).readOnly).toBe(true);//chyba nie musi być
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      selectCell(1, 1);
      contextMenu();
      var menu = $('.htContextMenu .ht_master .htCore tbody');
      menu.find('td').not('.htSeparator').eq(8).simulate('mousedown');
    }, 50);
  });

  it('should call /cell/meta ajax call while adding comment to the cell ', (done) => {

    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        comments: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      selectCell(1, 1);
      const plugin = hot.getPlugin('comments');
      plugin.setCommentAtCell(1, 1, 'Added comment');
    }, 50);
  });

  it('should call /cell/meta ajax call when freezing column', (done) => {

    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        manualColumnFreeze: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      const plugin = hot.getPlugin('manualColumnFreeze');
      plugin.freezeColumn(1);
    }, 50);
  });

  it('should call /cell/meta ajax call when hiding columns', (done) => {

    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenColumns: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      hot.getPlugin('hiddenColumns').hideColumn(2);
      hot.render();
    }, 50);
  });

  it('should call /cell/meta ajax call after show hidden colums', (done) => {

    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenColumns: {columns: [2]},
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      hot.getPlugin('hiddenColumns').showColumn(2);
      hot.render();
    }, 50);
  });

  it('should call /cell/meta ajax call when hiding rows', (done) => {

    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenRows: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      hot.getPlugin('hiddenRows').hideRow(2);
      hot.render();
    }, 50);
  });

  it('should call /cell/meta ajax call after show hidden rows', (done) => {

    var hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenRows: [2],
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            setTimeout(() => { done(); }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      hot.getPlugin('hiddenRows').showRow(2);
      hot.render();
    }, 50);
  });
});
