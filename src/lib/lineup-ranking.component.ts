import { Component, Input, ContentChildren } from '@angular/core';
import {
  builderAdapter,
  IBuilderAdapterImposeColumnProps,
  IBuilderAdapterNestedColumnProps,
  IBuilderAdapterRankingProps,
  IBuilderAdapterReduceColumnProps,
  IBuilderAdapterScriptColumnProps,
  IBuilderAdapterSupportColumnProps,
  IBuilderAdapterWeightedSumColumnProps,
  IImposeColumnBuilder,
  INestedBuilder,
  IReduceBuilder,
  IScriptedBuilder,
  IWeightedSumBuilder,
  LocalDataProvider,
  Ranking
} from 'lineupjs';

export abstract class ALineUpColumnBuilder {
  abstract build(): (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder);
}

@Component({
  selector: 'lineup-column',
  template: ''
})
export class LineUpColumnComponent extends ALineUpColumnBuilder {
  @Input()
  column: '*' | string = '*';

  build() {
    return builderAdapter.buildGeneric(this);
  }
}


@Component({
  selector: 'lineup-ranking',
  template: `<ng-content></ng-content>`
})
export class LineUpRankingComponent implements IBuilderAdapterRankingProps {
  @ContentChildren(ALineUpColumnBuilder)
  private readonly children: ALineUpColumnBuilder[] = [];

  @Input()
  sortBy?: (string | {column: string, asc: 'asc' | 'desc' | boolean}) | ((string | {column: string, asc: 'asc' | 'desc' | boolean})[]);

  @Input()
  groupBy?: string[] | string;

  @Input()
  columns?: (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder)[];

  merge() {
    const inline = this.children.map((d) => d.build());

    const columns = (this.columns || []).concat(inline);

    const r: IBuilderAdapterRankingProps = {columns};
    if (this.sortBy) {
      r.sortBy = this.sortBy;
    }
    if (this.groupBy) {
      r.groupBy = this.groupBy;
    }
    return r;
  }

  /*
   * build the column description
   */
  build(data: LocalDataProvider): Ranking {
    return builderAdapter.buildRanking(this, data);
  }

}


@Component({
  selector: 'lineup-impose-column',
  template: ''
})
export class LineUpImposeColumnComponent extends ALineUpColumnBuilder implements IBuilderAdapterImposeColumnProps {
  @Input()
  label?: string;
  @Input()
  column = '';
  @Input()
  categoricalColumn = '';

  build() {
    return builderAdapter.buildImposeRanking(this);
  }
}


@Component({
  selector: 'lineup-nested-column',
  template: `<ng-content></ng-content>`
})
export class LineUpNestedColumnComponent extends ALineUpColumnBuilder implements IBuilderAdapterNestedColumnProps {
  @ContentChildren(LineUpColumnComponent)
  private readonly columns: LineUpColumnComponent[] = [];

  @Input()
  label?: string;

  build(): INestedBuilder {
    return builderAdapter.buildNestedRanking(this, this.columns.map((d) => d.build()));
  }
}


@Component({
  selector: 'lineup-weighted-column',
  template: ''
})
export class LineUpWeightedColumnComponent extends ALineUpColumnBuilder {
  @Input()
  column = '';
  @Input()
  weight = 1;

  build() {
    return this.column;
  }
}


@Component({
  selector: 'lineup-weighted-sum-column',
  template: `<ng-content></ng-content>`
})
export class LineUpWeightedSumColumnComponent extends ALineUpColumnBuilder implements IBuilderAdapterWeightedSumColumnProps {
  @ContentChildren(LineUpWeightedColumnComponent)
  private readonly columns: LineUpWeightedColumnComponent[] = [];

  @Input()
  label?: string;

  build(): IWeightedSumBuilder {
    return builderAdapter.buildWeightedSumRanking(this, this.columns.map((d) => ({
      weight: d.weight,
      column: d.build()
    })));
  }
}


@Component({
  selector: 'lineup-reduce-column',
  template: `<ng-content></ng-content>`
})
export class LineUpReduceColumnComponent extends ALineUpColumnBuilder implements IBuilderAdapterReduceColumnProps {
  @ContentChildren(LineUpColumnComponent)
  private readonly columns: LineUpColumnComponent[] = [];

  @Input()
  type: 'min' | 'max' | 'mean' | 'median' = 'max';
  @Input()
  label?: string;

  build(): IReduceBuilder {
    return builderAdapter.buildReduceRanking(this, this.columns.map((d) => d.build()));
  }
}



@Component({
  selector: 'lineup-scripted-column',
  template: `<ng-content></ng-content>`
})
export class LineUpScriptedColumnComponent extends ALineUpColumnBuilder implements IBuilderAdapterScriptColumnProps {
  @ContentChildren(LineUpColumnComponent)
  private readonly columns: LineUpColumnComponent[] = [];

  @Input()
  code = '';
  @Input()
  label?: string;

  build(): IScriptedBuilder {
    return builderAdapter.buildScriptRanking(this, this.columns.map((d) => d.build()));
  }
}


@Component({
  selector: 'lineup-support-column',
  template: `<ng-content></ng-content>`
})
export class LineUpSupportColumnComponent extends ALineUpColumnBuilder implements IBuilderAdapterSupportColumnProps {
  @Input()
  type: 'rank' | 'selection' | 'group' | 'aggregate' | '*' = '*';

  build() {
    return builderAdapter.buildSupportRanking(this);
  }
}


@Component({
  selector: 'lineup-all-columns',
  template: ''
})
export class LineUpAllColumnsComponent extends ALineUpColumnBuilder {
  build() {
    return builderAdapter.buildAllColumnsRanking();
  }
}
