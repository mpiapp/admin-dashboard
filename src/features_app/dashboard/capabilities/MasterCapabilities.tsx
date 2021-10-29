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
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DataRow, CapabilityInput } from './capabilitiesTypes'
import { onGetCapability, onCreateCapability, onRemoveCapability, onUpdateCapability } from './action/capabilitiesAction';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  

    
function MasterCapabilities() {

    const capabilities = useSelector((state : RootState) => state.capabilities)

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
      
    /* istanbul ignore next */
    const onSubmit = (data: CapabilityInput): void => {
        if(IDRow === null) {
            onCreateCapability(data)
            reset()
        } else {
            let updateData= {
                name : data.name,
                _id: IDRow
            }
            onUpdateCapability(updateData)
            reset()
        }
    }

    /* istanbul ignore next */
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'ID',
            selector: row => row._id,
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
                            setIDRow(row._id)
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
        setIDRow(null)
        // eslint-disable-next-line
    },  [capabilities.create, capabilities.update, capabilities.remove]);


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
                    data={capabilities?.data}
                    progressPending={capabilities?.loading}
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
