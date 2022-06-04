/* eslint-disable */
import { render } from 'react-dom';

import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule Default sample
 */
export default class Default extends SampleBase {
    scheduleObj;
    data = extend([], dataSource, null, true);
    change(args) {
        this.scheduleObj.selectedDate = args.value;
        this.scheduleObj.dataBind();
    }
    onDragStart(args) {
        args.navigation.enable = true;
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='650px' ref={schedule => this.scheduleObj = schedule} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: this.data }} dragStart={(this.onDragStart.bind(this))}>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month'/>
                <ViewDirective option='Agenda'/>
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <div className='datepicker-control-section'>
                      <DatePickerComponent value={new Date(2021, 0, 10)} showClearButton={false} change={this.change.bind(this)} placeholder='Current Date' floatLabelType='Always'></DatePickerComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>);
    }
}
