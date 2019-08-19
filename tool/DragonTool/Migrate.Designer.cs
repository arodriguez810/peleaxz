namespace DragonTool
{
    partial class Migrate
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.txtPaths = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtIgnores = new System.Windows.Forms.TextBox();
            this.txtAlfa = new System.Windows.Forms.TextBox();
            this.txtBetas = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.btnMigrar = new System.Windows.Forms.Button();
            this.cbMove = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // txtPaths
            // 
            this.txtPaths.Location = new System.Drawing.Point(9, 41);
            this.txtPaths.Margin = new System.Windows.Forms.Padding(0, 5, 0, 5);
            this.txtPaths.Multiline = true;
            this.txtPaths.Name = "txtPaths";
            this.txtPaths.Size = new System.Drawing.Size(97, 533);
            this.txtPaths.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(9, 9);
            this.label1.Margin = new System.Windows.Forms.Padding(0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(55, 20);
            this.label1.TabIndex = 1;
            this.label1.Text = "Paths";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(906, 9);
            this.label2.Margin = new System.Windows.Forms.Padding(0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(70, 20);
            this.label2.TabIndex = 3;
            this.label2.Text = "Ignores";
            // 
            // txtIgnores
            // 
            this.txtIgnores.Location = new System.Drawing.Point(910, 41);
            this.txtIgnores.Margin = new System.Windows.Forms.Padding(0, 5, 0, 5);
            this.txtIgnores.Multiline = true;
            this.txtIgnores.Name = "txtIgnores";
            this.txtIgnores.Size = new System.Drawing.Size(113, 533);
            this.txtIgnores.TabIndex = 2;
            // 
            // txtAlfa
            // 
            this.txtAlfa.Location = new System.Drawing.Point(132, 41);
            this.txtAlfa.Margin = new System.Windows.Forms.Padding(0, 3, 0, 3);
            this.txtAlfa.Name = "txtAlfa";
            this.txtAlfa.Size = new System.Drawing.Size(764, 26);
            this.txtAlfa.TabIndex = 4;
            // 
            // txtBetas
            // 
            this.txtBetas.Location = new System.Drawing.Point(132, 125);
            this.txtBetas.Margin = new System.Windows.Forms.Padding(0, 3, 0, 3);
            this.txtBetas.Multiline = true;
            this.txtBetas.Name = "txtBetas";
            this.txtBetas.Size = new System.Drawing.Size(764, 449);
            this.txtBetas.TabIndex = 5;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(128, 9);
            this.label3.Margin = new System.Windows.Forms.Padding(0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(41, 20);
            this.label3.TabIndex = 6;
            this.label3.Text = "Alfa";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(128, 91);
            this.label4.Margin = new System.Windows.Forms.Padding(0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(56, 20);
            this.label4.TabIndex = 7;
            this.label4.Text = "Betas";
            // 
            // btnMigrar
            // 
            this.btnMigrar.Location = new System.Drawing.Point(435, 608);
            this.btnMigrar.Margin = new System.Windows.Forms.Padding(0, 3, 0, 3);
            this.btnMigrar.Name = "btnMigrar";
            this.btnMigrar.Size = new System.Drawing.Size(204, 43);
            this.btnMigrar.TabIndex = 8;
            this.btnMigrar.Text = "Migrar";
            this.btnMigrar.UseVisualStyleBackColor = true;
            this.btnMigrar.Click += new System.EventHandler(this.btnMigrar_Click);
            // 
            // cbMove
            // 
            this.cbMove.AutoSize = true;
            this.cbMove.Location = new System.Drawing.Point(308, 618);
            this.cbMove.Name = "cbMove";
            this.cbMove.Size = new System.Drawing.Size(70, 24);
            this.cbMove.TabIndex = 9;
            this.cbMove.Text = "Move";
            this.cbMove.UseVisualStyleBackColor = true;
            // 
            // Migrate
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1065, 690);
            this.Controls.Add(this.cbMove);
            this.Controls.Add(this.btnMigrar);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtBetas);
            this.Controls.Add(this.txtAlfa);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtIgnores);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtPaths);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(0, 5, 0, 5);
            this.Name = "Migrate";
            this.Text = "Migrate";
            this.Load += new System.EventHandler(this.Migrate_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtPaths;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtIgnores;
        private System.Windows.Forms.TextBox txtAlfa;
        private System.Windows.Forms.TextBox txtBetas;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button btnMigrar;
        private System.Windows.Forms.CheckBox cbMove;
    }
}