from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from .models import *
from mainapp.utils import BaseSerializer
from account.serializers import AccountSerializer
from .utils import get_form, update_form


class ProjectSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'created_by', 'manager', 'name', 'code', 'created_on', 'updated_on']

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'created_by' in required_fields:
            self.fields['created_by'] = AccountSerializer(many=False)
        if 'manager' in required_fields:
            self.fields['manager'] = AccountSerializer(many=False)
        return super(ProjectSerializer, self).to_representation(instance)


class BudgetLineSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = BudgetLine
        fields = ['id', 'created_by', 'project', 'code', 'text', 'created_on', 'updated_on']

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'created_by' in required_fields:
            self.fields['created_by'] = AccountSerializer(many=False)
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        return super(BudgetLineSerializer, self).to_representation(instance)


class FormUserSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = FormUser
        fields = ['id', 'user', 'signature', 'date', 'created_on', 'updated_on']

    def create(self, validated_data):
        init_data = self.initial_data
        print(init_data)

        value = super().create(validated_data)

        form_id = init_data.get('form_id', None)
        form_name = init_data.get('form_name', None)
        field_name = init_data.get('field_name', None)

        form = get_form(form_name, form_id)
        update_form(form, field_name, value)

        return value

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'user' in required_fields:
            self.fields['user'] = AccountSerializer(many=False)
        return super(FormUserSerializer, self).to_representation(instance)


class AmountReceivedSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = AmountReceived
        fields = ['id', 'amount', 'receipt', 'date', 'created_on', 'updated_on']

    def create(self, validated_data):
        init_data = self.initial_data
        value = super().create(validated_data)

        form_id = init_data.get('form_id', None)
        form_name = init_data.get('form_name', None)
        field_name = init_data.get('field_name', None)

        form = get_form(form_name, form_id)
        update_form(form, field_name, value)

        return value


class CashAdvanceFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = CashAdvanceForm
        fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by',
                  'amount_received', 'name',
                  'level', 'max_level', 'invoice_number', 'bank_batch_no', 'date', 'purpose', 'project', 'activity_end_date',
                  'expected_liquidation_date', 'items', 'total', 'is_completed', 'created_on', 'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        # if 'checker' in required_fields:
        #     self.fields['checker'] = AccountSerializer(many=False)
        if 'checked_by' in required_fields:
            self.fields['checked_by'] = FormUserSerializer(many=False)
        # if 'approver' in required_fields:
        #     self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'amount_received' in required_fields:
            self.fields['amount_received'] = AmountReceivedSerializer(many=False)
        return super(CashAdvanceFormSerializer, self).to_representation(instance)


class NotificationSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'receiver', 'sender', 'form', 'message', 'url', 'read', 'created_on', 'updated_on']

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'receiver' in required_fields:
            self.fields['receiver'] = AccountSerializer(many=False)
        if 'sender' in required_fields:
            self.fields['sender'] = AccountSerializer(many=False)
        return super(NotificationSerializer, self).to_representation(instance)


class ExpenseClaimFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = ExpenseClaimForm
        fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by',
                  'amount_received', 'name', 'level', 'max_level', 'invoice_number', 'bank_batch_no', 'purpose',
                  'project', 'budget_line', 'cash_advance_received', 'reason', 'items', 'total',
                  'is_completed', 'created_on', 'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        # if 'checker' in required_fields:
        #     self.fields['checker'] = AccountSerializer(many=False)
        if 'checked_by' in required_fields:
            self.fields['checked_by'] = FormUserSerializer(many=False)
        # if 'approver' in required_fields:
        #     self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'amount_received' in required_fields:
            self.fields['amount_received'] = AmountReceivedSerializer(many=False)
        return super(ExpenseClaimFormSerializer, self).to_representation(instance)


class RequestForQuotationFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = RequestForQuotationForm
        fields = ['id', 'country', 'currency','invoice_number', 'bank_batch_no', 'requested_by', 'vendor_name',
                  'address', 'phone_number', 'delivery_period', 'price_validity_period', 'warrant_period',
                  'payment_terms', 'level', 'max_level',  'items', 'total', 'requested_by', 'is_completed', 'created_on',
                  'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['requested_by'] = requested_by
        return super().create(validated_data)


class OverExpenditureFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = OverExpenditureForm
        # fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by',
        #           'amt_received_description', 'amt_received',
        #           'level', 'invoice_number', 'bank_batch_no', 'date_of_receipt', 'project', 'project_code',
        #           'items', 'total', 'is_completed', 'created_on', 'updated_on']
        fields = '__all__'

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

            validated_data['requested_by'] = requested_by
            return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        if 'requested_by' in required_fields:
            self.fields['requested_by'] = FormUserSerializer(many=False)
        if 'approver' in required_fields:
            self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'checker' in required_fields:
            self.fields['checker'] = AccountSerializer(many=False)
        if 'checked_by' in required_fields:
            self.fields['checked_by'] = FormUserSerializer(many=False)
        return super(OverExpenditureFormSerializer, self).to_representation(instance)


class UnderExpenditureFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = UnderExpenditureForm
        # fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by',
        #           'amt_received_description', 'amt_received',
        #           'level', 'invoice_number', 'bank_batch_no', 'date_of_receipt', 'project', 'project_code',
        #           'items', 'total', 'is_completed', 'created_on', 'updated_on', 'account_number', 'amount_deposited',
        #           'mpesa_code', 'ref_id', 'date', 'time']
        fields = '__all__'

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

            validated_data['requested_by'] = requested_by
            return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        if 'requested_by' in required_fields:
            self.fields['requested_by'] = FormUserSerializer(many=False)
        if 'approver' in required_fields:
            self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'checker' in required_fields:
            self.fields['checker'] = AccountSerializer(many=False)
        if 'checked_by' in required_fields:
            self.fields['checked_by'] = FormUserSerializer(many=False)
        return super(UnderExpenditureFormSerializer, self).to_representation(instance)


class LocalPurchaseOrderFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = LocalPurchaseOrderForm
        # fields = ['id', 'country', 'currency', 'invoice_number', 'bank_batch_no', 'project', 'budget_line', 'level',
        #           'max_level', 'date', 'payment_terms', 'delivery_date', 'supplier', 'address', 'mobile', 'items',
        #           'total', 'requested_by', 'return_to_email', 'is_completed', 'level', 'max_level',
        #           'created_on', 'updated_on']
        fields = '__all__'

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        if 'requested_by' in required_fields:
            self.fields['requested_by'] = FormUserSerializer(many=False)
        if 'approver' in required_fields:
            self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'budget_line' in required_fields:
            self.fields['budget_line'] = BudgetLineSerializer(many=False)
        return super(LocalPurchaseOrderFormSerializer, self).to_representation(instance)


class PurchaseRequisitionFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = PurchaseRequisitionForm
        fields = ['id', 'country', 'currency', 'requested_by', 'delivered_to', 'approver',
                  'approved_by', 'date_required', 'requisition_date',
                  'level', 'max_level', 'invoice_number', 'bank_batch_no', 'project', 'items', 'total',
                  'budget_availability', 'verified_by', 'confirmed_by', 'is_completed', 'created_on', 'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        if 'approver' in required_fields:
            self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'verified_by' in required_fields:
            self.fields['verified_by'] = FormUserSerializer(many=False)
        if 'confirmed_by' in required_fields:
            self.fields['confirmed_by'] = FormUserSerializer(many=False)
        return super(PurchaseRequisitionFormSerializer, self).to_representation(instance)

