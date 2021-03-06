import { Column } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column', () => {
  it('change data', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    column.render();

    column.changeData([...salesByArea, { area: 'ss', sales: 100 }]);
    expect(column.options.data).toEqual([...salesByArea, { area: 'ss', sales: 100 }]);
    expect(column.chart.geometries[0].elements.length).toBe(salesByArea.length + 1);

    column.destroy();
  });

  it('from empty to have data', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
    });

    column.render();

    column.changeData(salesByArea);
    expect(column.chart.geometries[0].elements.length).toBe(salesByArea.length);

    column.destroy();
  });

  it('stacked column: from empty to have data', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      isStack: true,
    });

    column.render();

    column.changeData(subSalesByArea);
    expect(column.chart.geometries[0].elements.length).toBe(subSalesByArea.length);

    column.destroy();
  });

  it('grouped column: from empty to have data', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      isGroup: true,
    });

    column.render();

    column.changeData(subSalesByArea);

    expect(column.chart.geometries[0].elements.length).toBe(subSalesByArea.length);

    column.destroy();
  });

  it('stacked grouped column', () => {
    const data = [
      { product_type: '办公用品', sex: '男', order_amt: 8, product_sub_type: '橡皮擦' },
      { product_type: '办公用品', sex: '男', order_amt: 20, product_sub_type: '砚台' },
      { product_type: '办公用品', sex: '女', order_amt: 21, product_sub_type: '橡皮擦' },
      { product_type: '办公用品', sex: '女', order_amt: 13, product_sub_type: '砚台' },

      { product_type: '家电家具', sex: '男', order_amt: 13, product_sub_type: '洗衣机' },
      { product_type: '家电家具', sex: '女', order_amt: 2, product_sub_type: '洗衣机' },
      { product_type: '家电家具', sex: '男', order_amt: 5, product_sub_type: '微波炉' },
      { product_type: '家电家具', sex: '女', order_amt: 23, product_sub_type: '微波炉' },

      { product_type: '电子产品', sex: '男', order_amt: 33, product_sub_type: '电脑' },
      { product_type: '电子产品', sex: '女', order_amt: 4, product_sub_type: '电脑' },
      { product_type: '电子产品', sex: '男', order_amt: 5.9, product_sub_type: '鼠标' },
      { product_type: '电子产品', sex: '女', order_amt: 5.9, product_sub_type: '鼠标' },
    ];

    const dualAxes = new Column(createDiv(), {
      data: [],
      xField: 'product_type',
      yField: 'order_amt',
      isGroup: true,
      isStack: true,
      seriesField: 'product_sub_type',
      groupField: 'sex',
    });

    dualAxes.render();
    dualAxes.changeData(data);
    const elements = dualAxes.chart.geometries[0].elements;
    expect(elements.length).toBe(data.length);
    expect(elements[0].shape.attr('fill')).toBe(elements[1].shape.attr('fill'));
    expect(elements[0].getModel().data).toMatchObject(data[0]);
    expect(elements[1].getModel().data).toEqual(data[2]);

    dualAxes.destroy();
  });
});
