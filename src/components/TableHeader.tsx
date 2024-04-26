/* eslint-disable react/prop-types */
interface TableHeaderProps {
  list: string[]
}

export const TableHeader: React.FC<TableHeaderProps> = ( { list } ) => {
  
  return (
    <thead>
      <tr>
        {list.map( ( item, i ) => 
          <th key={ i }>
            { item }
          </th> )}
      </tr>
    </thead>
  )
}
