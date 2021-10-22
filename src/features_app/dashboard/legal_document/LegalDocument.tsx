import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import BreadCrumbs from '../../../components/BreadCrumbs';
import TableData from '../../../components/TableData'
import { TableColumn } from 'react-data-table-component';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { 
    LegalDocumentInput,
    DataRowLegalDocument
} from './legalDocumentTypes' 

import { 
    onGetLegalDocument, 
    onCreateLegalDocument, 
    onRemoveLegalDocument,
    onUpdateLegalDocument
 } from './action/legalDocumentAction';

const validationSchema = yup    
    .object({
        title: yup.string()
        .required("Title is required"),
        short_title: yup.string()
        .required("Short Title is required"),
    })
    .required();
  

function LegalDocument() {
      
    const initialState = useSelector((state : RootState) => state.legaldocument)
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
      } = useForm<LegalDocumentInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const [open, setOpen] = useState(false);
    const [IdLegalDocument, setIdLegalDocument] = useState <any>(null);

    const handleClickOpen = () : void => {
        setOpen(true);
    };

    const handleClose = () : void => {
        setOpen(false);
    };

     /* istanbul ignore next */
    const onSubmit = (data: LegalDocumentInput): void => {
            if(IdLegalDocument === null) {
                let postData= {
                    title : data.title,
                    short_title : data.short_title
                }
                onCreateLegalDocument(postData)
            } else {
                let updateData= {
                    title : data.title,
                    short_title : data.short_title,
                    id: IdLegalDocument
                }
                onUpdateLegalDocument(updateData)
            }
            reset()
    }

     /* istanbul ignore next */
    const clickUpdateLegalDocument = (row : any) => {
        setValue("title", row.title);
        setValue("short_title", row.short_title);
        setIdLegalDocument(row.id)
        setTimeout(() => {
            handleClickOpen()
        }, 100);
    }

     /* istanbul ignore next */
    const columns: TableColumn<DataRowLegalDocument>[] = [
        {
            name: 'ID',
            selector: row => row.id,

        },
        {
            name: 'TITLE',
            selector: row => row.title,
        },
        {
            name: 'SHORT TITLE',
            selector: row => row.short_title,
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => clickUpdateLegalDocument(row)}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveLegalDocument(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetLegalDocument()
        setIdLegalDocument(null)
        // eslint-disable-next-line
    },  [initialState.create, initialState.update, initialState.remove]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Legal Document"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Legal Document</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                    }}
                >
                    Create New Legal Document
                </Button> 
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={initialState?.data}
                    progressPending={initialState?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
                
            >
               <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Legal Document</DialogTitle>
                    <div className="box-modal-create">
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.title}
                            /* istanbul ignore next */
                            helperText={errors.title && errors.title.message}
                            /* istanbul ignore next */
                            {...register('title')}
                            margin="normal"
                            fullWidth
                            size="small"
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                        />
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.short_title}
                            /* istanbul ignore next */
                            helperText={errors.short_title && errors.short_title.message}
                            /* istanbul ignore next */
                            {...register('short_title')}
                            margin="normal"
                            fullWidth
                            size="small"
                            id="short_title"
                            label="Short Title"
                            name="short_title"
                            autoComplete="short_title"
                        />
                         
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit" >Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )   
}

export default LegalDocument
