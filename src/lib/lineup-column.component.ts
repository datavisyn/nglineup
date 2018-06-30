import { Component, Input } from '@angular/core';
import {
  builderAdapter,
  EAdvancedSortMethod,
  IBuilderAdapterCategoricalColumnDescProps,
  IBuilderAdapterColumnDescProps,
  IBuilderAdapterDateColumnDescProps,
  IBuilderAdapterHierarchyColumnDescProps,
  IBuilderAdapterNumberColumnDescProps,
  IBuilderAdapterStringColumnDescProps,
  IBuilderAdapterActionsColumnDescProps,
  ICategoricalColumnDesc,
  ICategory,
  IColumnDesc,
  IDateColumnDesc,
  IHierarchyColumnDesc,
  INumberColumnDesc,
  IPartialCategoryNode,
  IStringColumnDesc,
  IActionColumnDesc,
  IAction,
  IGroupAction
} from 'lineupjs';


@Component({
  selector: 'lineup-column-desc'
})
export class LineUpColumnDescComponent implements IBuilderAdapterColumnDescProps {
  @Input()
  column = '';
  @Input()
  asMap?: boolean;
  @Input()
  asArray?: string[] | number | boolean;
  @Input()
  custom?: {[key: string]: any};

  build(_data: any[]): IColumnDesc {
    return builderAdapter.build(this);
  }
}


@Component({
  selector: 'lineup-categorical-desc'
})
export class LineUpCategoricalColumnDescComponent extends LineUpColumnDescComponent implements IBuilderAdapterCategoricalColumnDescProps {
  @Input()
  asOrdinal?: boolean;
  @Input()
  categories?: (string | Partial<ICategory>)[];
  @Input()
  missingCategory?: (string | Partial<ICategory>);
  @Input()
  asSet?: boolean | string;

  build(data: any[]): ICategoricalColumnDesc {
    return builderAdapter.buildCategorical(this, data);
  }
}


@Component({
  selector: 'lineup-date-desc'
})
export class LineUpDateColumnDescComponent extends LineUpColumnDescComponent implements IBuilderAdapterDateColumnDescProps {
  @Input()
  dateFormat?: string;
  @Input()
  dateParse?: string;

  build(): IDateColumnDesc {
    return builderAdapter.buildDate(this);
  }
}


@Component({
  selector: 'lineup-hierarchy-desc'
})
export class LineUpHierarchyColumnDescComponent extends LineUpColumnDescComponent implements IBuilderAdapterHierarchyColumnDescProps {
  @Input()
  hierarchy: IPartialCategoryNode = {
    name: '',
    children: []
  };

  @Input()
  hierarchySeparator?: string;

  build(): IHierarchyColumnDesc {
    return builderAdapter.buildHierarchy(this);
  }
}


@Component({
  selector: 'lineup-number-desc'
})
export class LineUpNumberColumnDescComponent extends LineUpColumnDescComponent implements IBuilderAdapterNumberColumnDescProps {
  @Input()
  domain?: [number, number];
  @Input()
  range?: [number, number];
  @Input()
  mapping?: 'linear' | 'sqrt' | 'pow1.1' | 'pow2' | 'pow3';
  @Input()
  scripted?: string;
  @Input()
  sort?: EAdvancedSortMethod;

  build(data: any[]): INumberColumnDesc {
    return builderAdapter.buildNumber(this, data);
  }
}


@Component({
  selector: 'lineup-string-desc'
})
export class LineUpStringColumnDescComponent extends LineUpColumnDescComponent implements IBuilderAdapterStringColumnDescProps {
  @Input()
  editable?: boolean;
  @Input()
  html?: boolean;
  @Input()
  pattern?: string;
  @Input()
  patternTemplates?: string[];

  build(): IStringColumnDesc {
    return builderAdapter.buildString(this);
  }
}


@Component({
  selector: 'lineup-actions-desc'
})
export class LineUpActionsColumnDescComponent extends LineUpColumnDescComponent implements IBuilderAdapterActionsColumnDescProps {
  @Input()
  actions?: IAction[];
  @Input()
  groupActions?: IGroupAction[];

  build(): IActionColumnDesc {
    return builderAdapter.buildActions(this);
  }
}
