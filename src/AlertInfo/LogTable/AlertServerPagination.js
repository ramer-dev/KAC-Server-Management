import React, {useEffect} from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function TablePaginationDemo(props) {
    const [page, setPage] = React.useState(props.page);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.rpp);

    const handleChangePage = async (event, newPage) => {

        setPage(newPage);
        await props.callback(newPage * rowsPerPage, rowsPerPage);
        // console.log('new ' + newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(
            parseInt(
                event.target.value
                , 10)
        );
        setPage(0);
        props.callback(page * event.target.value, event.target.value);

    };


    useEffect(() => {
        if(props.default === true){
            setRowsPerPage(25);
            setPage(0);
            props.callback(page * rowsPerPage, rowsPerPage)
        }
        // props.callback(rowsPerPage, page, props.count)
    });

    return (
        <TablePagination
            component="div"
            count={props.count}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}

        />
    );
}