import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import BreadCrumbs from '../../../components/BreadCrumbs';
import TableData from '../../../components/TableData'
import { TableColumn } from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import { 
    onGetStatus, 
    onCreateStatus, 
    onRemoveStatus,
    onUpdateStatus 
} from './action/statusAction'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DataRow, StatusInput } from './statusTypes'

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  

    
function MasterStatus() {

    const state = useSelector((state : RootState) => state.status)

    const [open, setOpen] = useState(false);
    const [IdStatus, setIdStatus] = useState <any>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<StatusInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
      
    /* istanbul ignore next */
    const onSubmit = (data: StatusInput): void => {
        if(IdStatus === null) {
            onCreateStatus(data)
            reset()
        } else {
            let updateData= {
                name : data.name,
                id: IdStatus
            }
            onUpdateStatus(updateData)
            reset()
        }
    }

    /* istanbul ignore next */
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'ID',
            selector: row => row.id,
            width: '200px'

        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => {
                            setValue("name", row.name);
                            setIdStatus(row.id)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveStatus(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetStatus()
        // eslint-disable-next-line
    },  [state.create, state.update, state.remove]);

    // console.log(getValues(), 'get values')

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Status"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Status</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Status
                </Button>
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={state?.data}
                    progressPending={state?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Status</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )   
}

export default MasterStatus
