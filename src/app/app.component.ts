import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {ChangeDetectorRef, Component, Injectable} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

export class GameNode {
  children: BehaviorSubject<GameNode[]>;
  constructor(public item: string, children?: GameNode[], public parent?: GameNode) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

/**
 * The list of games
 */
const TREE_DATA = [
  new GameNode('Model Name 1', [
    // new GameNode('Factorio'),
    // new GameNode('Oxygen not included'),
  ]),
  new GameNode('Model Name 2', [
    new GameNode('Document Type 1', [ ]),
    new GameNode(`Document Type 2`, [
      new GameNode('Document Name | Document version | Uploaded By | Document Name |Uploaded By | Delete'),
      new GameNode('Table2.docx | 1 | S.V. Muthekar | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []'),
      new GameNode('Table10.docx | 1 | Hanmant P Patil | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []'),
      new GameNode('Table11.docx | 1 | Hanmant P Patil | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []'),
      new GameNode('Table12.docx | 1 | Hanmant P Patil | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []')
    ]),
   ]),
  new GameNode('Model Name 3'),
  new GameNode('Model Name 4', [
    new GameNode('Document Type 5', [ 
      new GameNode('Document Name | Document version | Uploaded By | Document Name |Uploaded By | Delete'),
      new GameNode('Table2.docx | 1 | S.V. Muthekar | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []'),
      new GameNode('Table10.docx | 1 | Hanmant P Patil | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []'),
      new GameNode('Table11.docx | 1 | Hanmant P Patil | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []'),
      new GameNode('Table12.docx | 1 | Hanmant P Patil | 44422 | R S-VEl, S J-ECL, S C-HMR | [] | []')

    ]),
    new GameNode('Document Type 6', [ ]),
  ]),
  new GameNode('Model Name 5', [ ])
];
/**
 * @title Nested tree
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recursive: boolean = false;
  levels = new Map<GameNode, number>();
  treeControl: NestedTreeControl<GameNode>;


  dataSource: MatTreeNestedDataSource<GameNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this.treeControl = new NestedTreeControl<GameNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = TREE_DATA;
  }

  getChildren = (node: GameNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: GameNode) => {
    return node.children.value.length > 0;
  }
}
