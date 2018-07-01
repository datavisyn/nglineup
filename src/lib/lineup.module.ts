import {NgModule} from '@angular/core';
import {LineUpComponent, TaggleComponent} from './lineup.component';
import {LineUpWeightedSumColumnComponent, LineUpWeightedColumnComponent,
  LineUpSupportColumnComponent, LineUpScriptedColumnComponent, LineUpReduceColumnComponent,
  LineUpNestedColumnComponent, LineUpImposeColumnComponent, LineUpAllColumnsComponent,
  LineUpColumnComponent, LineUpRankingComponent} from './lineup-ranking.component';
import {LineUpActionsColumnDescComponent, LineUpColumnDescComponent,
  LineUpCategoricalColumnDescComponent, LineUpDateColumnDescComponent,
  LineUpHierarchyColumnDescComponent, LineUpNumberColumnDescComponent, LineUpStringColumnDescComponent} from './lineup-column.component';

@NgModule({
  imports: [
  ],
  declarations: [LineUpComponent, TaggleComponent,
    LineUpWeightedSumColumnComponent, LineUpWeightedColumnComponent, LineUpSupportColumnComponent,
    LineUpScriptedColumnComponent, LineUpReduceColumnComponent, LineUpNestedColumnComponent,
    LineUpImposeColumnComponent, LineUpAllColumnsComponent, LineUpColumnComponent, LineUpRankingComponent,
    LineUpActionsColumnDescComponent, LineUpColumnDescComponent, LineUpCategoricalColumnDescComponent,
    LineUpDateColumnDescComponent, LineUpHierarchyColumnDescComponent, LineUpNumberColumnDescComponent, LineUpStringColumnDescComponent],
  exports: [LineUpComponent,
    LineUpWeightedSumColumnComponent, LineUpWeightedColumnComponent, LineUpSupportColumnComponent,
    LineUpScriptedColumnComponent, LineUpReduceColumnComponent, LineUpNestedColumnComponent,
    LineUpImposeColumnComponent, LineUpAllColumnsComponent, LineUpColumnComponent, LineUpRankingComponent,
    LineUpActionsColumnDescComponent, LineUpColumnDescComponent, LineUpCategoricalColumnDescComponent,
    LineUpDateColumnDescComponent, LineUpHierarchyColumnDescComponent, LineUpNumberColumnDescComponent, LineUpStringColumnDescComponent]
})
export class LineUpModule {}
