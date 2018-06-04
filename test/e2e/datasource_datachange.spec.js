import {
  selectCell,
  mouseDown,
  resizeColumn,
  colWidth
} from '../helpers/common';

import {
  conditionMenuRootElements
} from '../helpers/utils';

require('jasmine-ajax');
let ZSchema = require('z-schema');

describe('datasource_datachange', () => {
  const id = 'testContainer';
  const url = 'http://example.com/dummy';
  let request;

  beforeEach(function (done) {
    if (!this.$container) {
      this.$container = $(`<div id="${id}"></div>`).appendTo('body');
    }
    jasmine.Ajax.install();
    jasmine.Ajax.stubRequest(`${url}/settings`).andReturn({
      response: JSON.stringify({
        data: {
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
          hiddenRows: true
        }
      })
    });
    jasmine.Ajax.stubRequest(`${url}/row`, '', 'DELETE').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/column`, '', 'DELETE').andReturn({
      response: JSON.stringify({
        name: 'dynamic_1'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/update`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/column/move`, '', 'POST').andReturn({
      response: JSON.stringify({
        name: 'dynamic_1'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/column`, '', 'PUT').andReturn({
      response: JSON.stringify({
        name: 'dynamic_1'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/row`, '', 'PUT').andReturn({
      response: JSON.stringify({
        data: {
          id: 10,
          first_name: '',
          last_name: '',
          age: '',
          sex: '',
          phone: ''
        },
        id: 'id'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/data`, '', 'POST').andReturn({
      status: 200,
      contentType: 'application/json',
      response: JSON.stringify({
        rowId: 'id',
        meta: [],
        colOrder : [
          "id", "first_name", "last_name", "age", "sex", "phone"
        ],
        data: [{
          id: 1,
          first_name: 'John',
          last_name: 'Smith',
          age: 10,
          sex: 'male',
          phone: '+435564656'
        },
        {
          id: 2,
          first_name: 'Kasia',
          last_name: 'Sandwich',
          age: 18,
          sex: 'female',
          phone: '+4325324'
        },
        {
          id: 3,
          first_name: 'Jane',
          last_name: 'Walker',
          age: 60,
          sex: 'female',
          phone: '+43553456'
        },
        {
          id: 4,
          first_name: 'Rafal',
          last_name: 'Ek',
          age: 34,
          sex: 'male',
          phone: '+4354324234'
        },
        {
          id: 5,
          first_name: 'Kam',
          last_name: 'Dobrz',
          age: 20,
          sex: 'male',
          phone: '+435223122'
        }
        ]
      })
    });
    jasmine.Ajax.stubRequest(`${url}/cell/merge`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/cell/unmerge`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/column/resize`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/row/resize`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/cell/meta`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    jasmine.Ajax.stubRequest(`${url}/cell`, '', 'POST').andReturn({
      response: JSON.stringify({
        data: 'ok'
      })
    });
    done();
  });

  afterEach(function () {
    if (this.$container) {
      jasmine.Ajax.uninstall();
      destroy();
      this.$container.remove();
    }
  });

  const validator = new ZSchema();

  const dataSchema = {
    properties: {
      sort: {
        type: 'object',
        properties: {
          column: {
            type: 'string'
          },
          order: {
            type: 'string',
            enum: ['ASC', 'DESC']
          }
        }
      },
      filters: {
        type: 'array',
        items: {
          column: {
            type: 'string'
          },
          conditions: {
            type: 'array',
            items: {
              name: {
                type: 'string',
              },
              args: {
                type: 'array',
                items: {
                  type: 'array'
                }
              }
            }
          }
        }
      }
    }
  };

  const createSchema = {
    properties: {
      index: {
        type: 'integer',
      },
      amount: {
        type: 'integer',
      },
      source: {
        type: 'string',
      }
    },
    required: [
      'index',
      'amount',
      'source'
    ],
  };

  const columnMoveSchema = {
    properties: {
      columnNames: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      target: {
        type: 'integer'
      },
    },
    required: [
      'columnNames',
      'target'
    ]
  };

  const changeSchema = {
    properties: {
      changes: {
        type: 'array',
        items: {
          row: {
            type: 'integer'
          },
          column: {
            type: 'string'
          },
          oldValue: {
            type: ['string', 'integer']
          },
          newValue: {
            type: ['string', 'integer']
          },
          meta: {
            type: 'object',
            properties: {
              key: {
                type: 'string'
              },
              value: {
                type: 'string'
              }
            }
          }
        },
        source: {
          type: 'string'
        }
      }
    }
  };

  const mergeSchema = {
    properties: {
      mergedParent: {
        type: 'object',
        properties: {
          column: {
            type: 'string'
          },
          row: {
            type: 'integer'
          }
        }
      },
      mergedCells: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            column: {
              type: 'string'
            },
            row: {
              type: 'integer'
            }
          }
        }
      }
    }
  };

  const columnResizeSchema = {
    properties: {
      column: {
        type: 'string'
      },
      size: {
        type: 'integer'
      }
    },
    required: [
      'column',
      'size'
    ],
  };

  const rowResizeSchema = {
    properties: {
      row: {
        type: 'string'
      },
      size: {
        type: 'integer'
      }
    },
    required: [
      'row',
      'size'
    ],
  };

  const metaChangeSchema = {
    properties: {
      row: {
        type: 'integer'
      },
      column: {
        type: 'string'
      },
      key: {
        type: 'string'
      },
      value: {
        type: ['string', 'integer', 'object']
      }
    },
    required: [
      'type',
      'column',
      'key',
      'value'
    ]
  };

  it('should call GET /settings ajax call on init', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if (req.request.url === `${url}/settings`) {
            request = jasmine.Ajax.requests.at(0);
            expect(request.method).toBe('GET');
            expect(request.url).toBe(`${url}/settings`);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
  });

  it('should call POST /data ajax call on init', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if (req.request.url === `${url}/data`) {
            request = jasmine.Ajax.requests.at(1);
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/data`);
            setTimeout(() => {
              done();
            }, 100);
          }
        }
      },
    });
  });

  it('should call PUT /row ajax call after create row', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/row`) {
            request = jasmine.Ajax.requests.filter(`${url}/row`)[0];
            expect(request.method).toBe('PUT');
            expect(request.url).toBe(`${url}/row`);
            let val = validator.validate(request.body, createSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
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

  it('should call POST /data ajax call after filter', (done) => {
    let i = 0;
    let hot = handsontable({
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
              let val = validator.validate(request.body, dataSchema);
              expect(val).toBe(true);
              setTimeout(() => {
                done();
              }, 50);
            }
          }else {
            jasmine.Ajax.requests.reset();
          }
        }
      },
    });
     setTimeout(() => {
      dropdownMenu(1);
      $(dropdownMenuRootElement().querySelector('.htUISelect')).simulate('click');
      $(conditionMenuRootElements().first.querySelector('tbody :nth-child(9) td')).simulate('mousedown');
      setTimeout(function () {
        document.activeElement.value = 'K';
        $(document.activeElement).simulate('keyup');
        $(dropdownMenuRootElement().querySelector('.htUIButton.htUIButtonOK input')).simulate('click');
      }, 200);
  }, 150);
});

  it('should call POST /column/move ajax call after column move', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        colHeaders: true,
        manualColumnMove: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/column/move`) {
            request = jasmine.Ajax.requests.filter(`${url}/column/move`)[0];
            expect(request.method).toBe('POST');
            let val = validator.validate(request.body, columnMoveSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 150);
          } else {
            jasmine.Ajax.requests.reset();
          }
        }
      },
    });
    setTimeout(() => {
      let $container = $(`#${id}`);
      let $rowsHeaders = $container.find('.ht_clone_top tr th');

      $rowsHeaders.eq(2).simulate('mousedown');
      $rowsHeaders.eq(2).simulate('mouseup');
      $rowsHeaders.eq(2).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseover');
      $rowsHeaders.eq(1).simulate('mousemove');
      $rowsHeaders.eq(1).simulate('mouseup');
    }, 50);
  });

  it('should call PUT /column ajax call after create column', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/column`) {
            request = jasmine.Ajax.requests.filter(`${url}/column`)[0];
            expect(request.method).toBe('PUT');
            let val = validator.validate(request.body, createSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 150);
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

    }, 150);
  });

  it('should call POST /cell ajax call on change cell value', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        onDataSend: (req) => {
          if (req.request.url === `${url}/data`) {
            setDataAtCell(1, 2, 'test');
          }
          if (req.request.url === `${url}/cell`){
            let request = jasmine.Ajax.requests.filter(`${url}/cell`)[0];
            let data = JSON.parse(request.params);
            expect(request.method).toBe('POST');
            expect(data.changes[0].column).toBe('last_name');
            expect(data.changes[0].newValue).toBe('test');
            expect(data.changes[0].oldValue).toBe('Sandwich');
            expect(data.changes[0].row).toBe(2);
            let val = validator.validate(request.body, changeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });

  });

  it('should call POST /cell/merge ajax call after merging cells and /cell/unmerge ajax after spliting merged cells', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        mergeCells: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/merge`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/merge`)[0];
            expect(request.method).toBe('POST');
            let val = validator.validate(request.body, mergeSchema);
            expect(val).toBe(true);
            const plugin = hot.getPlugin('mergeCells');
            plugin.unmerge(0, 0, 2, 2);
          }
          if (req.request.url === `${url}/cell/unmerge`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/unmerge`)[0];
            expect(request.method).toBe('POST');
            let val = validator.validate(request.body, mergeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      const plugin = hot.getPlugin('mergeCells');
      plugin.merge(0, 0, 2, 2);
    }, 100);
  });

  it('should call POST /column/resize ajax call after changing width of the column', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/column/resize`) {
            request = jasmine.Ajax.requests.filter(`${url}/column/resize`)[0];
            expect(request.method).toBe('POST');
            expect(colWidth($('#testContainer'), 0)).toBe(200);
            let val = validator.validate(request.body, columnResizeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      resizeColumn(1, 200);
    }, 50);
  });

  it('should call POST /row/resize ajax call after changing height of the row', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/row/resize`) {
            request = jasmine.Ajax.requests.filter(`${url}/row/resize`)[0];
            expect(request.method).toBe('POST');
            expect(rowHeight($('#testContainer'), 0)).toBe(61);
            let val = validator.validate(request.body, rowResizeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      resizeRow(0, 60);
    }, 50);
  });

  it('should call POST /cell/meta ajax call when aligning text', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 150);
          }
        }
      },
    });

    setTimeout(()=>{
      contextMenu();
            let item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
            item.simulate('mouseover');
            setTimeout(() => {
              selectCell(2, 3);
              let contextSubMenu = $(`.htContextMenuSub_${item.text()}`);
              let button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(0);
              button.simulate('mousedown');
              deselectCell();
            }, 350);
    }, 50);
  });

  it('should call POST /cell/meta ajax call while setting read-only property to the cell', (done) => {
    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        readOnly: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            expect(getCellMeta(0, 0).readOnly).toBe(true);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      selectCell(1, 1);
      contextMenu();
      let menu = $('.htContextMenu .ht_master .htCore tbody');
      menu.find('td').not('.htSeparator').eq(8).simulate('mousedown');
    }, 50);
  });

  it('should call POST /cell/meta ajax call while adding comment to the cell ', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        comments: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
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

  it('should call POST /cell/meta ajax call when freezing column', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        manualColumnFreeze: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            done();
            setTimeout(() => {
              done();
            }, 250);
          }
        }
      },
    });
    setTimeout(() => { 
      const plugin = hot.getPlugin('manualColumnFreeze');
      plugin.freezeColumn(1);
      hot.render();
    }, 250);
  });

  it('should call POST /cell/meta ajax call when hiding columns', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        hiddenColumns: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      let plugin = hot.getPlugin('hiddenColumns');
      plugin.hideColumn(2);
      hot.render();
    }, 200);
  });

  it('should call POST /cell/meta ajax call after show hidden colums', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenColumns: {
          columns: [2]
        },
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      let plugin = hot.getPlugin('hiddenColumns');
      plugin.showColumn(2)
      hot.render();
    }, 50);
  });

  it('should call POST /cell/meta ajax call when hiding rows', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenRows: true,
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      let plugin = hot.getPlugin('hiddenRows');
      plugin.hideRow(2);
      hot.render();
    }, 50);
  });

  it('should call POST /cell/meta ajax call after show hidden rows', (done) => {

    let hot = handsontable({
      dataSourceConnector: {
        controllerUrl: url,
        contextMenu: true,
        hiddenRows: [2],
        onDataSend: (req) => {
          if (req.request.url === `${url}/cell/meta`) {
            request = jasmine.Ajax.requests.filter(`${url}/cell/meta`)[0];
            expect(request.method).toBe('POST');
            expect(request.url).toBe(`${url}/cell/meta`);
            let val = validator.validate(request.body, metaChangeSchema);
            expect(val).toBe(true);
            setTimeout(() => {
              done();
            }, 50);
          }
        }
      },
    });
    setTimeout(() => {
      let plugin = hot.getPlugin('hiddenRows').showRow(2);
      plugin.showRow(2)
      hot.render();
    }, 50);
  });
});
