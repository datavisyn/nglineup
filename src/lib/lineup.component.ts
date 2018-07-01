import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges,
  OnDestroy, SimpleChanges, Input, Output, EventEmitter, ContentChildren,
  ViewEncapsulation } from '@angular/core';
import {LineUpRankingComponent} from './lineup-ranking.component';
import {LineUpColumnDescComponent} from './lineup-column.component';
import {
  builderAdapter,
  Column,
  IBuilderAdapterProps,
  ICellRendererFactory,
  IDynamicHeight,
  IGroupData,
  IGroupItem,
  IToolbarAction,
  LineUp,
  Taggle,
  ILineUpOptions,
  LocalDataProvider,
  ITaggleOptions,
  Ranking,
} from 'lineupjs';


@Component({
  selector: 'lineup-lineup',
  template: `
    <div #lu></div>
    <ng-content></ng-content>
  `,
  styleUrls: [
    './lineup.component.css',
    '../../node_modules/lineupjs/build/LineUpJS.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class LineUpComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, IBuilderAdapterProps  {
  @ViewChild('lu')
  private _main: ElementRef<HTMLDivElement>;

  @ContentChildren(LineUpRankingComponent)
  private rankings: LineUpRankingComponent[] = [];

  @ContentChildren(LineUpColumnDescComponent)
  private descs: LineUpColumnDescComponent[] = [];

  @Input()
  data: any[] = [];

  @Input()
  selection: number[] | null = null;
  @Input()
  highlight: number | null = null;

  @Output()
  private readonly highlightChange = new EventEmitter<number>();
  @Output()
  private readonly selectionChange = new EventEmitter<number[]>();

  @Input()
  singleSelection?: boolean;
  @Input()
  filterGlobally?: boolean;
  @Input()
  noCriteriaLimits?: boolean;
  @Input()
  maxGroupColumns?: number;
  @Input()
  maxNestedSortingCriteria?: number;

  columnTypes?: {[type: string]: typeof Column};

  @Input()
  deriveColumns?: boolean | string[];
  @Input()
  deriveColors?: boolean;

  @Input()
  restore?: any;
  @Input()
  defaultRanking?: boolean | 'noSupportTypes';

  @Input()
  animated?: boolean;
  @Input()
  sidePanel?: boolean;
  @Input()
  sidePanelCollapsed?: boolean;
  @Input()
  defaultSlopeGraphMode?: 'item' | 'band';
  @Input()
  summaryHeader?: boolean;
  @Input()
  expandLineOnHover?: boolean;
  @Input()
  overviewMode?: boolean;
  @Input()
  labelRotation?: number;

  @Input()
  renderer?: {[id: string]: ICellRendererFactory};
  @Input()
  toolbar?: {[id: string]: IToolbarAction};

  @Input()
  rowHeight?: number;
  @Input()
  rowPadding?: number;

  @Input()
  groupHeight?: number;
  @Input()
  groupPadding?: number;

  @Input()
  dynamicHeight?: (data: (IGroupItem | IGroupData)[], ranking: Ranking) => (IDynamicHeight | null);

  private readonly _adapter = new builderAdapter.Adapter({
    props: () => this,
    createInstance: (data: LocalDataProvider, options: Partial<ILineUpOptions>) =>
      this.createInstance(this._main.nativeElement, data, options),
    columnDescs: (data: any[]) => this.descs.map((d) => d.build(data)),
    rankingBuilders: () => this.rankings.map((d) => d.merge())
  });

  onSelectionChanged(selection: number[]) {
    this.selection = selection;
    this.selectionChange.emit(selection);
  }

  onHighlightChanged(highlight: number) {
    this.highlight = highlight;
    this.highlightChange.emit(highlight);
  }

  protected createInstance(node: HTMLElement, data: LocalDataProvider, options: Partial<ITaggleOptions>): LineUp | Taggle {
    return new LineUp(node, data, options);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._adapter.componentDidMount();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const changed = new Set(Object.keys(changes).filter((d) => !changes[d].firstChange));
    if (changed.size > 0) {
      this._adapter.componentDidUpdate((prop) => changed.has(prop));
    }
  }

  ngOnDestroy() {
    this._adapter.componentWillUnmount();
  }
}
