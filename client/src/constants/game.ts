export type GAMESIZE = {
    row: number,
    col: number
}

export type RowProp = {
    row: number,
    rowValues: number[]
  }

export type GridProp = {
  boardState: number[][]
}

export type CellProp = {
    row: number,
    col: number,
    cellValue: number
  }

export type ChildrenProps = {
  children: JSX.Element
}


export var threebythree: GAMESIZE = {
    row: 3,
    col: 3
}
