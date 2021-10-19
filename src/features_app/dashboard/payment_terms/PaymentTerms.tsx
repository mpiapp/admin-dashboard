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
    onGetPaymentTerms, 
    onCreatePaymentTerms, 
    onRemovePaymentTerms,
    onUpdatePaymentTerms 
} from './action/paymentTermsAction'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DataRowPaymentTerms, PaymentTermsInput } from './paymentTermsTypes'

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  

    
function PaymentTerms() {

    const paymentTerms = useSelector((state : RootState) => state.paymentterms)

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
      } = useForm<PaymentTermsInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
      
    /* istanbul ignore next */
    const onSubmit = (data: PaymentTermsInput): void => {
        if(IdStatus === null) {
            onCreatePaymentTerms(data)
            reset()
        } else {
            let updateData= {
                name : data.name,
                id: IdStatus
            }
            onUpdatePaymentTerms(updateData)
            reset()
        }
    }

    /* istanbul ignore next */
    const columns: TableColumn<DataRowPaymentTerms>[] = [
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
                    <Button onClick={() => onRemovePaymentTerms(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetPaymentTerms()
        // eslint-disable-next-line
    },  [paymentTerms.create, paymentTerms.update, paymentTerms.remove]);

    // console.log(getValues(), 'get values')

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Payment Terms"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Payment Terms</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Payment Terms
                </Button>
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={paymentTerms?.data}
                    progressPending={paymentTerms?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Payment Terms</DialogTitle>
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

export default PaymentTerms
