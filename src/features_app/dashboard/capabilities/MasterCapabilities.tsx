
/* istanbul ignore file */
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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import {  } from './capabilitiesSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DataRow, CapabilityInput } from './capabilitiesTypes'
import { onGetCapability, onCreateCapability, onRemoveCapability, onUpdateCapability } from './action/dispatchAction';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  

    
function MasterCapabilities() {

    const dispatch = useDispatch()
    const state = useSelector((state : RootState) => state.capabilities)

    // console.log(state, 'state')

    const [open, setOpen] = useState(false);
    const [IDRow, setIDRow] = useState <any>(null);

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
      } = useForm<CapabilityInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
      
    const onSubmit = (data: CapabilityInput): void => {
        if(IDRow === null) {
            onCreateCapability(data)
            reset()
        } else {
            let updateData= {
                name : data.name,
                id: IDRow
            }
            onUpdateCapability(updateData)
            reset()
        }
    }

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
                            setIDRow(row.id)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveCapability(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetCapability()
        // eslint-disable-next-line
    },  [state.create, state.update, state.remove]);


    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Capabilities"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Capabilities</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Capabilities
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
                    <DialogTitle>Add New Capability</DialogTitle>
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

export default MasterCapabilities
